//Third Jenkins file that include Timeouts, retries, Finishing up.
/*pipeline {
    agent any
    stages {
        stage ('FailExit'){
            steps {
                 // sh 'echo "Fail!"; exit 1'
                 sh 'echo "changing the output "'
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
*/

/*Adding a new pipeline to the example, showing what happen when the Pipeline has finished executing, 
you may need to run clean-up steps or perform some actions based on the outcome of the Pipeline. 
These actions can be performed in the post section. */


pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'echo "Success!"' 
                //exit 1'
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