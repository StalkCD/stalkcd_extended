pipeline {
  agent none
  stages {
    stage('uberjar') {
      agent any
      steps {
        sh 'echo "Hello World"'
      }
    }
    stage('build') {
      steps {
        parallel(
          'java-test': {
             agent any
             steps {
              parallel(
                "java-test1": {
                  sh 'cat Jenkinsfile'
                  sh 'echo "test1"'
                  
                },
                "java-test2": {
                  sh 'echo "test2"'
                  
                }
              )
            }
          },
          'c++-build': {
             agent any
             steps {
              parallel(
                "gcc54-amd64-debug": {
                  sh 'cat Jenkinsfile'            
                },
                "gcc54-amd64-release": {
                  sh 'cat Jenkinsfile'
                }
              )
            }
          }
        )
      }
    }
    stage('regression test') {
      agent any
      steps {
        sh 'echo "Hello World"'
      }
    }
    stage('promote') {
      agent any
      steps {
        sh 'echo "Hello World"'
      }
    }
  }
  triggers {
    pollSCM('* * * * *')
  }
}