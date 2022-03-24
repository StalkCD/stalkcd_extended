pipeline {
  agent any
  stages {
    stage('checkout') {
      steps {
        git(url: 'https://github.com/iberrada/TestJenkinsPipeline.git', branch: 'master', poll: true, changelog: true)
      }
    }
    stage('build') {
      steps {
        build 'TestJenkinsPipeline'
      }
    }
  }
}