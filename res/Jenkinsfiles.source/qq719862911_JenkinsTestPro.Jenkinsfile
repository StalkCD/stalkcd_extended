pipeline {
  agent any
  stages {
    stage('Test1') {
      steps {
        sh '''pipeline {
    agent { docker \'node:6.3\' }
    stages {
        stage(\'build\') {
            steps {
                sh \'npm --version\'
            }
        }
    }
}'''
        }
      }
    }
  }