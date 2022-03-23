pipeline {
    agent { docker { image 'python:3.5.1' } }
    stages {
        stage('build') {
              steps {
                  sh 'python --version'
                  sh '''
                      echo "Hello World!"
                      echo "Multiline shell steps work too"
                      ls -lah
                      '''
              }
        }

        stage('Deploy') {
              steps {
                  retry(3) {
                      sh './flakey-deploy.sh'
                  }

                  timeout(time: 3, unit: 'MINUTES') {
                      sh './health-check.sh'
                  }
            }
        }
        stage('Test') {
              steps {
                  sh 'echo "Passed"; exit 0'
              }
            }
        }

        post {
            always {
                echo 'This will always run'
            }
            success {
                echo 'This will run only if successful'
            }
            failure {
                echo 'This will run only if failed'
            }
            unstable {
                echo 'This will run only if the run was marked as unstable'
            }
            changed {
                echo 'This will run only if the state of the Pipeline has changed'
                echo 'For example, if the Pipeline was previously failing but is now successful'
            }
        }
}
