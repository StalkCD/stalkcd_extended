#!/usr/bin/env groovy

@Library('jenkins-global-libraries') _

pipeline {
    //agent any
    agent {
        label {
            label ""
            customWorkspace "/var/jenkins_home/workspace/wsi-sun_master"
        }
    }
    tools {
        maven 'apache-maven-3.5.0'
    }
    environment {
        WORKSPACE = pwd()

        PROJECT_DEPLOY_SCRIPT_DIRECTORY = "helix-deploy-scripts"
        PROJECT_DEPLOY_BASEDIR = "temp"
        
        // controls pipeline graph indicators and more importantly flow on failure
        // setting "true" puts currentBuild state into "UNSTABLE" if failure occurs on test, and pipeline continues processing
        // otherwise puts currentBuild state into "FAILURE" if failure occurs on test, and pipeline continuation halts
        SUPPRESS_TEST_FAILURES = "true"
    }
    options {
        buildDiscarder(logRotator(numToKeepStr: '25'))
	    disableConcurrentBuilds()
    }

    stages {
        stage('Init') {
            steps {
                //echo 'Initing...'
                //sayHello 'Phuc Tran The'
                 // global initialization tasks
                
                echo 'Check out latest helix-deploy-scripts...'            
                dir("${PROJECT_DEPLOY_SCRIPT_DIRECTORY}") {
                    git branch: 'master', credentialsId: '', url: 'https://github.com/tranthephuc/HelloGithub.git'
                }
                
                script {
                    def buildUtilities = new BuildUtilities()
                    
                    buildUtilities.createMetadata(this)
                }
            }
        }
        stage('Build') {
            steps {
                echo 'Building...'
            }
        }
        stage('Package') {
            steps {
                echo 'Packaging...'
            }
        }
        stage('PreDeploy') {
            steps {
                echo 'PreDeploying....'
            }
        }
        stage('Deploy (Dev)') {
            steps {
                echo 'Deploying...'
                sayGoodbye 'Phuc Tran The'
            }
        }
    }
}
