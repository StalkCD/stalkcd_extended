pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm i'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'node --version'
            }
        }
    }
     post {
        always {
            echo 'Finished'
        }
        success {
            echo 'Pipeline is successful'
        }
        failure {
            echo 'Pipeline failed'
        }
        unstable {
            echo 'Something is unstable'
        }
        changed {
            echo 'This will run only if the state of the Pipeline has changed'
            echo 'For example, if the Pipeline was previously failing but is now successful'
        }
    }
}