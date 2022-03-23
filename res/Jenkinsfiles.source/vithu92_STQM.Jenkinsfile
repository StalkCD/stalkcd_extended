pipeline {
  agent any
  stages {
    stage('Initalize') {
      steps {
        echo 'Pipeline is going to start...'
        git 'https://github.com/vithu92/STQM'
      }
    }
    stage('Compile') {
      agent {
        docker {
          image 'node:7-alpine'
        }
      }
      steps {
        sh 'node --version'
      }
    }
  }
}
