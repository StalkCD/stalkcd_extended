pipeline {
  agent {
    docker {
       image 'node:6-alpine'
       args '-p 3000:3000'
    }
  }
  environment {
    CI = true
  }
  stages {x
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }
  }
    stage('Deploy') {
      steps {
        sh './ci/scripts/deploy.sh'
        // input message: 'Finished using the web site?  (Click "Proceed" to continue)'
        // sh './ci/scripts/kill.sh'
      }
    }
  }
}

pipeline {
    agent none
    stages {
        stage('Development') {
            agent {
              docker {
                image 'node:6-alpine'
                args '-p 3000:3000'
              }
            }
            steps {
                sh 'npm install'
                sh './ci/scripts/deploy.sh'
            }
        }
        stage('Testing') {
            agent {
                docker { image 'rtyler/rvm:2.3.0' }
            }
            steps {
                sh 'ruby --version'
            }
        }
    }
}