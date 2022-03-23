#!/usr/bin/env groovy

pipeline {
    agent { docker 'maven:3.3.3' }
    stages {
        stage('build') {
            steps {
                sh 'mvn --version'
            }
        }
        stage('deploy') {
            steps {
                sh 'pwd'
                sh '''
                    ls -laht
                '''
            }
        }
    }
    post {
        success {
            slackSend  color: 'good',
                              message: "The pipeline ${currentBuild.fullDisplayName} completed successfully."
        }
        always {
            slackSend         color: 'yellow',
                              message: "The pipeline ${currentBuild.fullDisplayName} completed successfully."
        }
    }
}