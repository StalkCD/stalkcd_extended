pipeline {
  agent {
    label 'jdk8'
      }
  stages {
    stage('Say Hello') {
      steps {
          sh 'java -version'
          }
    }
    stage('Testing') {
      failFast true
        parallel {
        stage('Java 8') {
          agent {
            label 'jdk8'
              }
          steps {
            sh 'java -version'
              sleep(time: 10, unit: 'SECONDS')
              }
        }
        stage('Java 9') {
          agent {
            label 'jdk9'
              }
          steps {
            sh 'java -version'
              sleep(time: 20, unit: 'SECONDS')
              }
        }
        stage('Maven8 Container') {
          agent { label 'jdk9' }
          steps {
            container('maven8') {
              sh 'mvn -v'
                }
          }
        }
      }
    }
  }
}
