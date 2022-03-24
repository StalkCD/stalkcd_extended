pipeline {
  agent any
  stages {
    stage('Checkout') {
      parallel {
        stage('Checkout Pipeline') {
          steps {
            dir(path: 'pipeline') {
              git(url: 'git@github.com:christoflemke/build-test.git', branch: 'pipeline', changelog: true, credentialsId: 'jenkins-test-repo', poll: true)
            }
            
          }
        }
        stage('Checkout Frontend') {
          steps {
            dir(path: 'frontend') {
              git(url: 'git@github.com:christoflemke/build-test.git', branch: 'frontend', changelog: true, credentialsId: 'jenkins-test-repo', poll: true)
            }
            
          }
        }
      }
    }
    stage('Test') {
      parallel {
        stage('Status Pipeline') {
          steps {
            dir(path: 'pipeline') {
              sh 'git status'
              sh 'find .'
            }
            
          }
        }
        stage('Status Frontend') {
          steps {
            dir(path: 'frontend') {
              sh 'git status'
              sh 'find'
            }
            
          }
        }
      }
    }
    stage('Deploy') {
      steps {
        input(message: 'Hi', id: 'id-hi', ok: 'Ja')
      }
    }
    stage('Done') {
      steps {
        sh 'find .'
      }
    }
  }
}