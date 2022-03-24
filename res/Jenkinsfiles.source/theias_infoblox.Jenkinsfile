#!/usr/bin/env groovy

pipeline {
    options {
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '100'))
    }
    agent none
    stages {
        stage('Test') {
            agent {
                label 'php7&&test'
            }
            steps {
                sh 'ant'
                pmd canComputeNew: false, defaultEncoding: '', healthy: '', pattern: '**/build/pmd.xml', unHealthy: ''
            }
        }
    }
    post {
        unstable {
            mail to: 'di@ias.edu',
                subject: "Pipeline: ${currentBuild.fullDisplayName} unstable",
                body: "The pipeline status is unstable on ${env.BUILD_URL}"
        }
        failure {
            mail to: 'di@ias.edu',
                subject: "Pipeline: ${currentBuild.fullDisplayName} failure",
                body: "The pipeline status is failure on ${env.BUILD_URL}"
        }
    }
}

