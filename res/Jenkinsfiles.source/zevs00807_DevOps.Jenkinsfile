pipeline {
  agent any
  stages {
    stage('hg') {
      agent {
        node {
          label 'ghdfgdfgdf'
        }

      }
      steps {
        script {

          pipeline {
            agent {
              label 'host_1'
            }
            triggers {
              cron(' * 23 * * *')
            }
            stages {
              stage('git_clone') {
                steps {
                  git 'https://github.com/zevs00807/DevOps.git'
                }
              }
              stage('docker-up') {
                steps {
                  sh 'users && groups'
                  sh 'docker-compose up --build -d'
                }
              }

            }
          }
        }

      }
    }
  }
}