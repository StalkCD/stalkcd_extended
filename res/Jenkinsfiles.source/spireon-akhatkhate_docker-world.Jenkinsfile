pipeline {
  agent none

  stages {

    stage ('prepare') {
        agent any

        steps {
            checkout scm
            script {
                properties = readProperties file: 'config.ini'
                echo "App Name - ${properties.APP_NAME}"
            }
        }
    }

    stage('Setup') {
      agent any

      steps {
        echo "Inside stage setup for ${properties.APP_NAME}"
      }
    }
  }
}


