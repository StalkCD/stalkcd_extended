pipeline {
    agent none
    stages {
        stage('Test') {
    		agent { dockerfile true }

            steps {
                sh 'python web/test.py'
                sh 'python --version'
            }
        }

        stage('Build') {
		    echo 'Bild must run on success'
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