#!/usr/bin/env groovy

pipeline {
    options {
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '100'))
    }
    agent none
    environment {
        DEPLOY_TAG = new Date().format( 'yyyy-MM-dd-hh-mm-ss' )
    }
    stages {
        stage('Test') {
            agent {
                label 'webgrp3&&test'
            }
            steps {
                sh 'ant'
                pmd canComputeNew: false, defaultEncoding: '', healthy: '', pattern: '**/build/pmd.xml', unHealthy: ''
            }
        }
        stage('Deploy - Staging') {
            agent {
                label 'ibportal3.ias.edu'
            }
            steps {
                sh '''
                set -euo pipefail
                composer install
                vendor/bin/dep deploy staging --branch=$BRANCH_NAME
                '''
            }
        }
        stage('Production Check') {
            when {
                branch 'master'
            }
            steps {
                mail to: 'di@ias.edu',
                    subject: "Pipeline: ${currentBuild.fullDisplayName} ready to deploy to production",
                    body: "The pipeline is ready to deploy to production on ${env.BUILD_URL}"
                timeout(time: 15, unit: 'MINUTES') {
                    input message: 'Deploy to Production?'
                }
            }
        }
        stage('Deploy - Production') {
            when {
                branch 'master'
            }
            agent {
                label 'ibportal3.ias.edu'
            }
            environment {
                API_KEY = credentials('NEW_RELIC_API_KEY')
                APP_ID = '83701444'
            }
            steps {
                sh '''
                set -euo pipefail
                git tag $DEPLOY_TAG
                git push origin $DEPLOY_TAG
                composer install
                vendor/bin/dep deploy production --tag=$DEPLOY_TAG
                set -x
                /home/jenkins/bin/new_relic_record_deployment.sh $API_KEY $APP_ID $DEPLOY_TAG jenkins
                '''
                mail to: 'di@ias.edu',
                    subject: "Pipeline: ${currentBuild.fullDisplayName} deployed",
                    body: "The pipeline has been deployed to production on ${env.BUILD_URL}"
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

