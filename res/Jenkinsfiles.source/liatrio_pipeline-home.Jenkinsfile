#!/bin/env groovy
library 'pipeline-library'
pipeline {
    agent none
    environment {
        APP_NAME = "__APP_NAME__"
        S3_BUCKET = "${APP_NAME}.liatr.io"
        AWS_DEFAULT_REGION = 'us-west-2'
        SLACK_ROOM = "${APP_NAME}"
        STAGE = ''
        CI=true
    }
    stages {
        stage('Build & Test') {
            agent {
                docker {
                    image 'node:10.5-alpine'
                }
            }
            steps {
                script {
                    STAGE = env.STAGE_NAME
                    sh "yarn install --production && yarn run test && yarn run build"
                }
            }
        }
        stage('Deploy') {
            when { branch 'master' }
            agent {
                docker {
                    image 'cgswong/aws:latest'
                    args '-e AWS_DEFAULT_REGION'
                }
            }
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'AWS-SVC-Jenkins-non-prod-dev', accessKeyVariable: 'AWS_ACCESS_KEY_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY' ]]) {
                    script {
                        STAGE = env.STAGE_NAME
                        sh "aws s3 sync ./build/ s3://${S3_BUCKET} --delete"
                        slackSend channel: env.SLACK_ROOM, color: 'good', message: "Updated ${APP_NAME} dashboard pushed to <http://${S3_BUCKET}/>"
                    }
                }
            }
        }
    }
    post {
        failure {
            slackSend channel: env.SLACK_ROOM, color: 'danger', message: "Pipeline failed at stage: <${RUN_DISPLAY_URL}|${STAGE}>"
        }
    }
}
