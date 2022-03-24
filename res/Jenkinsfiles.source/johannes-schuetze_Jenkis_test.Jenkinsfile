pipeline {
    //agent { docker { image 'python:3.5.1' } }
    agent any
    stages {

      stage('pre-build') {
          steps {
              echo 'Building environment'
              sh 'sudo apt-get install curl python-all python-pip wget git libmysqlclient-dev rabbitmq-server python-dev nginx nodejs npm libmagickwand-dev tesseract-ocr libffi-dev'
                }
            }

        stage('build') {
            steps {
                sh 'python --version'
                  }
              }
        stage('Test') {
            steps {
                echo 'Testing..'
                  }
              }
        }

/*        post {
                always {
                    echo 'One way or another, I have finished'
                    /* deleteDir()  clean up our workspace */
/*                }
                success {
                    echo 'I succeeeded!'
                    mail to: 'jschuetze@truckitapp.com',
                    subject: "Jenkins run status \"SUCCESS\" for:  ${currentBuild.fullDisplayName}",
                    body: "jenkins run ${env.BUILD_URL} succeeded"
                }
                unstable {
                    echo 'Unstable Pipeline'
                    mail to: 'jschuetze@truckitapp.com',
                    subject: "Jenkins run status \"UNSTABLE\" for:  ${currentBuild.fullDisplayName}",
                    body: "jenkins run ${env.BUILD_URL} unstable"
                }
                failure {
                    echo 'Failed jenkins run'
                    mail to: 'jschuetze@truckitapp.com',
                    subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
                    body: "Something is wrong with ${env.BUILD_URL}"
                }
                changed {
                    echo 'Pipeline status change'
                    mail to: 'jschuetze@truckitapp.com',
                    subject: "Changed Status for Pipeline: ${currentBuild.fullDisplayName}",
                    body: "Status of Pipeline changed ${env.BUILD_URL}"
                }
            }*/

          }
