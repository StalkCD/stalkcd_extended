pipeline {
  agent any
  stages {
    stage('start') {
      steps {
        sh """\
          /Users/shaunxu/github/wt-rd-pipeline/packages/agent/node_modules/.bin/ts-node \
          /Users/shaunxu/github/wt-rd-pipeline/packages/agent/src/index.ts \
          --pipeline=5c4034b045871184af1ed67a \
          --job-name=${env.JOB_NAME} \
          --build-id=${env.BUILD_ID} \
          --build-tag=${env.BUILD_TAG} \
          --build-url=${env.BUILD_URL} \
          --action=BEGIN
        """
      }
    }
    stage('install') {
      steps {
        sh 'npm i'
      }
    }
    stage('build') {
      steps {
        sh 'npm run build'
      }
    }
    stage('test') {
      steps {
        sh 'npm test'
      }
    }
  }
  post {
    always {
      sh """\
        /Users/shaunxu/github/wt-rd-pipeline/packages/agent/node_modules/.bin/ts-node \
        /Users/shaunxu/github/wt-rd-pipeline/packages/agent/src/index.ts \
        --pipeline=5c4034b045871184af1ed67a \
        --build-tag=${env.BUILD_TAG} \
        --build-result=${currentBuild.currentResult} \
        --log-path="${env.JENKINS_HOME}/jobs/${env.JOB_NAME}/builds/${env.BUILD_ID}/log" \
        --action=END
      """
    }
  }
}