#!groovy

pipeline {
  agent any
  stages {
        
        stage('Docker Build') {
            agent any
            steps {
                sh 'docker build -t php.app:latest .'
            }
        }
        stage('Docker Execute') {
            agent any
            steps {
                sh 'docker run -p 1234:80 -d php.app'
            }
        }
        stage('Docker Test') {
            agent any
            steps {
                sh 'curl -i localhost:1234'
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
