pipeline {
    agent any
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh './src/ci/scripts/build.sh'
            }
        }
        stage('Deliver') {
            steps {
                sh './src/ci/scripts/delivery.sh'
            }
        }
    }

    post {
        always {
            echo 'Post pipeline'
        }
        success {
            echo 'Pipeline with a success'
        }
        failure {
            echo 'Pipelien failed'
        }
    }
}
