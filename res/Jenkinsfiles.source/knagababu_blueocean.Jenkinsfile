pipeline {
  agent {
    docker 'maven:3.3.3'
  }
  stages {
    stage('build') {
      steps {
        sh '''pipeline {
    agent any
    stages {
        stage(\'Build\') {
            steps {
                sh \'echo "Hello World"\'
                sh \'\'\'
                    echo "Multiline shell steps works too"
                    ls -lah
                \'\'\'
            }
        }
    }
}'''
        }
      }
      stage('Test') {
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
        stage('STG') {
          steps {
            sh '''pipeline {
    agent { docker \'ruby\' }
    stages {
        stage(\'build\') {
            steps {
                sh \'ruby --version\'
            }
        }
    }
}'''
            }
          }
        }
      }