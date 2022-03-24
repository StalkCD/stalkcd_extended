pipeline {
    agent none
    environment{
        TEST_ENV = 'test'
    }
    stages{
        stage('Build'){
            agent any
            steps{
                echo "Building version: ${BUILD_NUMBER}"
                sh "./mvnw --version"
            }
        }
        stage('Deploy'){
            agent any
            steps{
                echo "Deploying version"
            }
        }
        stage('Performance'){
            agent any
            steps{
                echo "Running performance"
            }
        }
        stage ('Deploy-Prod Approval') {
            agent none
            steps{
                milestone 1
                input message: 'Are you sure you want to deploy to Production?'
            }
        }
        stage('Deploy Production'){
            agent any
            steps{
                echo "Deploying in production"
            }
        }
    }
    post {
        success {
            echo 'pipeline executed succesfully'
        }

        failure {
            echo 'pipeline finished with errors'
        }
    }
}