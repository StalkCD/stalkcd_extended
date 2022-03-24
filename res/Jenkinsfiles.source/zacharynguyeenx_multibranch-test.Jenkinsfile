#!groovy

// Standard iOS pipeline
pipeline {

  // Leave it to each stage to decide which agent to use
  // as to allow for parallel builds
  agent none

  options { ansiColor('xterm') }

  stages {

    stage('Pull Request Validations') {

      when {
        beforeAgent true
        changeRequest()
      }

      agent any

      steps { 

        lockThenSteps {

          echo 'Pull Request Validations done'
        }
      }
    }

    stage('On Branch: develop') {

      when {
        beforeAgent true
        branch 'develop'
      }

      parallel {

        stage('Dev Job') {

          agent any

          steps { 

            lockThenSteps {

              echo 'Dev Job done' 
            }
          }
        }

        stage('QA Job') {

          agent any

          steps { 

            lockThenSteps {

              echo 'QA Job done' 
            }
          }
        }
      }
    }

    stage('On Branch: master') {

      when {
        beforeAgent true
        branch 'master'
      }

      agent any

      steps { 

        lockThenSteps {

          echo 'Master Job done' 
        }
      }
    }
  }
}

def lockThenSteps(steps) {
  
  lock('compiler_' + env.NODE_NAME) {
    steps()
  }
}
