pipeline {
  agent {
    node {
      label 'ecs-slave-docker'
    }

  }
  stages {
    stage('Tool Versions') {
      parallel {
        stage('Maven Version') {
          agent {
            docker {
              image 'maven:latest'
            }

          }
          steps {
            sh 'ls -lart'
          }
        }
        stage('chef version') {
          agent {
            docker {
              image 'chef/chefdk:latest'
            }

          }
          steps {
            sh 'echo $(chef --version) >> chef.version'
            stash(name: 'chef', includes: 'chef.version')
          }
        }
        stage('python 3 version') {
          agent {
            docker {
              image 'python:3.5'
            }

          }
          steps {
            sh 'echo $(python --version) >> python3.version'
            stash(name: 'python3', includes: 'python3.version')
          }
        }
        stage('node version') {
          agent {
            docker {
              image 'node:latest'
            }

          }
          steps {
            sh 'echo $(node --version) >> node.version'
            stash(name: 'node', includes: 'node.version')
          }
        }
        stage('awscli version') {
          agent {
            docker {
              image 'aztek/awscli:latest'
            }

          }
          steps {
            sh 'echo $(aws --version) >> aws.version'
            stash(name: 'awscli', includes: 'aws.version')
          }
        }
        stage('gradle version') {
          agent {
            docker {
              image 'gradle:jdk8-slim'
            }

          }
          steps {
            sh 'gradle --version'
          }
        }
        stage('terraform version') {
          agent {
            docker {
              image 'hashicorp/terraform:light'
              args '--entrypoint=\'\''
            }

          }
          steps {
            sh 'terraform --version'
          }
        }
      }
    }
    stage('testing and build') {
      parallel {
        stage('firefox') {
          steps {
            echo 'firefox testing'
            sleep 10
          }
        }
        stage('internet explorer') {
          steps {
            echo 'IE testing'
            sleep 5
          }
        }
        stage('chrome') {
          steps {
            echo 'chrome testing'
            sleep 7
          }
        }
      }
    }
    stage('Approval') {
      steps {
        input(id: 'Required approval', message: 'Proceed with pipeline?', ok: 'Approve', submitter: 'mjimenez')
      }
    }
    stage('Review Versions') {
      parallel {
        stage('chef verify') {
          steps {
            unstash 'chef'
            readFile 'chef.version'
          }
        }
        stage('python3 verify') {
          steps {
            unstash 'python3'
            readFile 'python3.version'
          }
        }
      }
    }
    stage('FINISH') {
      steps {
        echo 'The End!!'
      }
    }
  }
}