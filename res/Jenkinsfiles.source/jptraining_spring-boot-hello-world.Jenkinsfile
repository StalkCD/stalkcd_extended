pipeline {
    agent none
    stages {
        stage('Checkout Source Code') {
           agent {
                label "master"
            }
            steps {
                //properties([pipelineTriggers([[$class: 'GitHubPushTrigger'], pollSCM('H/15 * * * *')])])
                checkout scm
            }            
        } 
        stage('Building Source Code') {
           agent {
                label "master"
            }
            steps {
                sleep(new Random().nextInt(10) * 2)
                sh "mvn compile"
            }            
        }                    
        stage('Checking...') {
            parallel {
                stage('Running Unit Tests') {
                    agent {
                        label "master"
                    }
                    steps {
                        sh "mvn test"
                    }
                }
                stage('Sonar Quality check') {
                    agent {
                        label "master"
                    }
                    steps {
                        sh "mvn test"
                    }
                    post {
                        always {
                            echo "Checks OK"
                        }
                    }
                }
            }
        }

        stage('Deploy artefacts to Nexus') {
           agent {
                label "master"
            }
            steps {
                sleep(new Random().nextInt(10) * 5)
                sh "mvn compile"
            }            
        }  

        stage('Deploy app to target environment') {
           agent {
                label "master"
            }
            steps {
                sleep(new Random().nextInt(10) * 2)
                sh "mvn compile"
            }            
        }  

        stage('Testing ...') {
           agent {
                label "master"
            }
            steps {
                sleep(new Random().nextInt(10) * 2)
                sh "mvn compile"
            }            
        }  
    }
}