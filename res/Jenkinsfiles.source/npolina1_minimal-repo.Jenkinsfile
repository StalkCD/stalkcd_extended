pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo 'Building ..... Pipeline'
      }
    }
    stage('Test Firefox') {
      parallel {
        stage('Test') {
          steps {
            sh 'echo \'Testing FireFox\''
          }
        }
        stage('Test Chrome') {
          steps {
            sh 'echo \'Testing Chrome\''
          }
        }
        stage('Test Edge') {
          steps {
            sh 'echo \'Testing Edge\''
          }
        }
      }
    }
    stage('Deploy') {
      steps {
        echo 'Deploying ... PipeLIne'
      }
    }
  }
}