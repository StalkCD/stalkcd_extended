#!/usr/bin/env groovy

pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building...'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                bat 'python manage.py test'
                echo 'Wrapping up Testing.'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }
    }
    post {
        always {
            echo 'running cleanup'
        }
        success {
            echo 'pipeline succeeded'
        }
        failure {
            echo 'pipeline failed'
        }
        unstable {
            echo 'pipeline unstable'
        }
        changed {
            echo 'pipeline was modified'
        }
    }
}
