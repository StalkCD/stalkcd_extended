pipeline {
    triggers {
        pollSCM('H/30 * * * *')
    }
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'whoami && pwd && env'
            }
        }
    }
    post {
        success {
            echo 'The pipeline completed successfully. Hurray!'
        }
        failure {
            echo 'The pipeline failed. Oh no!'
        }
    }
}
