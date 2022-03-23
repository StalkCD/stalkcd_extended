#!/usr/bin/env groovy

@Library('abort-previous-builds-library') _

pipeline {
    agent any
    stages {
        stage('Abort') {
            when {  // https://jenkins.io/doc/book/pipeline/syntax/#when
                beforeAgent true
                not {  // Nested when condition "not" requires exactly 1 child condition.
                    anyOf {
                        branch 'origin/master';  // Note that this only works on a multibranch Pipeline. ¯\_(ツ)_/¯
                        branch 'origin/develop';  // Note that this only works on a multibranch Pipeline. ¯\_(ツ)_/¯
                    }
                }
            }
            steps {
                println "Aborting previous builds if exists."
                abortPreviousBuilds()
            }
        }
        stage('Build') {
            steps {
                script {
                    def gitCommit = env.GIT_COMMIT
                    def shortGitCommit = gitCommit[0..6]
                    sh "echo ${shortGitCommit}"

                    def branchName = env.GIT_BRANCH
                    if (branchName.startsWith('origin/mast')) {
                        sh 'echo Filtered branch detected.'
                    }

                    if (env.GIT_BRANCH == 'origin/master' || env.GIT_BRANCH == 'origin/development') {
                        echo 'Allowed branch detected.'
                        // abortPreviousBuilds()
                    } else {
                        echo 'Blocked concurrent branch detected.'
                        abortPreviousBuilds()
                    }
                }
                sh 'env | sort'
                // https://issues.jenkins-ci.org/browse/JENKINS-46285
                println '\${BUILD_NUMBER}:'
                sh "echo ${env.BUILD_NUMBER}"
                println '\${GIT_BRANCH}:'
                sh "echo ${env.GIT_BRANCH}"
                println '\${GIT_COMMIT}:'
                sh "echo ${env.GIT_COMMIT}"
                println '\${GIT_PREVIOUS_COMMIT}:'
                sh "echo ${env.GIT_PREVIOUS_COMMIT}"
                println '\${GIT_PREVIOUS_SUCCESSFUL_COMMIT}:'
                sh "echo ${env.GIT_PREVIOUS_SUCCESSFUL_COMMIT}"
                sleep 42
            }
        }
    }
}
