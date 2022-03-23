#!/usr/bin/env groovy

pipeline {
    agent none
    stages {
        stage ('Start') {
            steps {
                slackSend  channel: '#jenkins',
                    color: 'good',
                    message: "The pipeline ${currentBuild.fullDisplayName} started."
            }
        }
        stage('Build') {
            agent { docker 'python:2.7.10' }
            steps {
                sh 'python main.py'
            }
        }
        stage('Deploy') {
            agent any
            when {
                branch 'master'
            }
            steps {
                ansiblePlaybook(
                    playbook: 'ansible_test_playbook.yml',
                    extras: '-e hello_name="Jenkins"'
                )
            }
        }
    }
    post {
        success {
            slackSend channel: '#jenkins',
                      color: 'good',
                      message: "The pipeline ${currentBuild.fullDisplayName} completed successfully."
        }
        failure {
            slackSend channel: '#jenkins',
                      color: 'RED',
                      message: "The pipeline ${currentBuild.fullDisplayName} failed."
        }
        unstable {
            slackSend channel: '#jenkins',
                      color: 'RED',
                      message: "The pipeline ${currentBuild.fullDisplayName} is unstable."
        }
    }
}
