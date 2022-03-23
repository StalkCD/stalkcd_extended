pipeline {
  agent {
    node {
      label 'master'
    }
  }
  stages {
    stage('Checkout SCM') {
      steps {
        git credentialsId: 'ddcde83f-8153-4a7b-a154-8989hkjhshjk',
        poll: false, url: 'git@hub.com:anup.dubey/nodejs-pipeline.git'
      }
    }
    stage('Install Dependencies') {
      steps {
        sh '''npm install'''
      }
    }
    stage('Create Artifact') {
      steps {
        sh '''mkdir -p /tmp/jenkins && chmod 0700 /tmp/jenkins && \
            tar -czf /tmp/jenkins/nodejs-pipeline-$BUILD_NUMBER.tar.gz \
                --exclude=.git --exclude=.gitignore \
                --exclude=Jenkinsfile *'''
      }
    }
    stage('Upload Artifact') {
      steps {
        retry(2) {
            sh '''aws s3 cp /tmp/jenkins/nodejs-pipeline-$BUILD_NUMBER.tar.gz s3://nodejs-pipeline/ '''
        }
      }
    }
    stage('Deploy Artifact') {
      steps {
        sh '''aws deploy create-deployment --application-name nodejs-pipeline \
              --deployment-group-name nodejs-pipeline --deployment-config-name nodejs-pipline50\
              --s3-location bucket=nodejs-pipeline,key=nodejs-pipeline-$BUILD_NUMBER.tar.gz,bundleType=tgz \
              --region us-east-2'''
      }
    }
    stage('Remove Artifact') {
      steps {
        sh '''rm -f /tmp/jenkins/*.tar.gz'''
      }
    }
  }
  post {
    failure {
      echo 'Work in progress here...'
    }
  }
}
