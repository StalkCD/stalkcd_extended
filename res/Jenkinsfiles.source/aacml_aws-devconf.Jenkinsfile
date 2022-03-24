#!/usr/bin/env groovy
pipeline {
    agent { node { label 'aws' } }

    stages {
        stage ('Setup environment') {
            steps {
                script {
                    env.PROFILE='jenkins-deploy-mld'
                    env.DATA_PATH='data'
                    if (env.BRANCH_NAME == 'release') {
                        env.TENANT_NAME='acme'
                    } else {
                        env.TENANT_NAME='acme-'+env.BRANCH_NAME
                    }
                }
            }
        }
        stage('Certificate') {
            steps {
                sh "ci/certificate-pipeline-multitenant.sh"
            }
        }
        stage('Api') {
            steps {
                sh "ci/api-pipeline-multitenant.sh"
            }
        }
        stage('Data') {
            steps {
                sh "ci/data-pipeline-multitenant.sh"
            }
        }
    }
}