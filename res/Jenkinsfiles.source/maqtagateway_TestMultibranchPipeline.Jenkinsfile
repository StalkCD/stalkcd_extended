pipeline {
    agent any 
    stages {
        stage('Build') {
            steps {
                echo 'Build!' 
            }
        }
        stage('Test') {
            steps {
                echo 'Test!' 
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploy!' 
            }
        }
    }
    post {
        always {
            echo 'Post Pipeline'
        }
        success {
            echo 'Post Pipeline Success'
        }
        failure {
            echo 'Post Pipeline Failure'
        }
        unstable {
            echo 'Post Pipeline Unstable'
        }
        changed {
            echo 'This will run only if the state of the Pipeline has changed'
            echo 'For example, if the Pipeline was previously failing but is now successful'
        }
    }
}