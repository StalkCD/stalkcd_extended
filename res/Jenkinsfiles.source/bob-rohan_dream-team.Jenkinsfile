pipeline {
  agent {
    node {
      label 'master'
    }
    
  }
  stages {
    stage('SCM dreamteam') {
      steps {
        echo 'Starting dreamteam pipeline'
      }
    }
    stage('Mvn build deamteam-web') {
      parallel {
        stage('Mvn build deamteam-web') {
          options {
            skipDefaultCheckout(true)
          }
          steps {
            bat 'dreamteam-web/maven-build.bat'
            stash(name: 'dreamteam-web', includes: 'dreamteam-web\\target\\*.jar')
            stash(name: 'dreamteam-web-dockerfile', includes: 'dreamteam-web\\Dockerfile')
          }
        }
        stage('Mvn build dreamteam-rest') {
          options {
            skipDefaultCheckout(true)
          }
          steps {
            bat 'rest-server\\maven-build.bat'
            stash(name: 'rest-server-jar', includes: 'rest-server\\target\\*.jar')
            stash(name: 'rest-server-dockerfile', includes: 'rest-server\\Dockerfile')
          }
        }
      }
    }
    stage('Docker build') {
      parallel {
        stage('Docker build dreamteam-web') {
          agent {
            node {
              label 'Raspberry Pi'
            }
            
          }
          options {
            skipDefaultCheckout(true)
          }
          steps {
            unstash 'dreamteam-web'
            unstash 'dreamteam-web-dockerfile'
            sh '''cd dreamteam-web
docker build -t bobrohan/dreamteam-web:latest .'''
          }
        }
        stage('Docker build dreamteam-rest') {
          agent {
            node {
              label 'Raspberry Pi'
            }
            
          }
          options {
            skipDefaultCheckout(true)
          }
          steps {
            unstash 'rest-server-jar'
            unstash 'rest-server-dockerfile'
            sh '''cd rest-server
docker build -t bobrohan/dreamteam-rest:latest .'''
          }
        }
      }
    }
    stage('Docker clean') {
      parallel {
        stage('Docker clean dreamteam-web') {
          agent {
            node {
              label 'Raspberry Pi'
            }
            
          }
          options {
            skipDefaultCheckout(true)
          }
          steps {
            sh '''docker stop $(docker ps -a | grep dreamteam-web | awk \'{print $1}\')
docker rm $(docker ps -a | grep dreamteam-web | awk \'{print $1}\')'''
          }
        }
        stage('Docker clean dreamteam-rest') {
          agent {
            node {
              label 'Raspberry Pi'
            }
            
          }
          options {
            skipDefaultCheckout(true)
          }
          steps {
            sh '''docker stop $(docker ps -a | grep dreamteam-rest | awk \'{print $1}\')
docker rm $(docker ps -a | grep dreamteam-rest | awk \'{print $1}\')'''
          }
        }
      }
    }
    stage('Docker run') {
      parallel {
        stage('Docker run dreamteam-web') {
          agent {
            node {
              label 'Raspberry Pi'
            }
            
          }
          options {
            skipDefaultCheckout(true)
          }
          steps {
            sh 'docker run -d -p 8089:8089 --name=dreamteam-web bobrohan/dreamteam-web'
          }
        }
        stage('Docker run dreamteam-rest') {
          agent {
            node {
              label 'Raspberry Pi'
            }
            
          }
          options {
            skipDefaultCheckout(true)
          }
          steps {
            sh 'docker run -d -p 8088:8088 --name=dreamteam-rest bobrohan/dreamteam-rest'
          }
        }
      }
    }
  }
}
