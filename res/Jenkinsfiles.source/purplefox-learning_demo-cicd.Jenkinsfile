#!/usr/bin/env groovy

pipeline {

    agent any   //agent label:""
    //examples:
    //agent { node { label 'linux' } }
    //agent docker: 'ubuntu', label: 'highend'

    tools {
        //we dont use it at the moment
    }

    environment {
        welcomeMsg = 'welcome to the little CICD world'
    }

    //buildParameters?
    //buildTriggers?

    //seems we can define "def var" somewhere here, verify

    stages {
        stage('Initialize') {
            steps {
                script {
                    bat 'echo "${welcomeMsg}"'
                    bat 'echo "${env.welcomeMsg}"'
                    echo "${env.welcomeMsg}"
                    echo "java -version"
                    bat 'echo "java -version'
                    println 'initializing for cicd build...'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    library "jenkins-pipeline-lib-core@master"  //standard way to import a library
                    gradleBuild(tasks: 'clean build', outputLevel: 'info', includeTest:'false')
                    //junit '**/my-reports/**/*.xml‘
                }
            }
        }
        stage('Package') {
            steps {
                script {
                    println 'dummy package'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    println 'dummy deploy'
                }
            }
        }
    }
    postBuild { //postBuild run in a node
        success {
            //delete dir?
        }
        failure {
            //delete dir?
        }
        always {
            //echo?
        }
    }
    notifications {  //notification does not run in a node
        success{}
        failure{}   //mail to the team?
        always{}
    }
    //environment, tools section?
}