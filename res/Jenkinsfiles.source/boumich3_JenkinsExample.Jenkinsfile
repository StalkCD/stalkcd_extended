pipeline {
    agent none 
    stages {
        stage('Information') { 
            agent any
            steps {
                sh 'groups' 
            }
        }
        stage('Py Compile') { 
            agent {
                docker {
                    image 'python:2-alpine' 
                }
            }
            steps {
                sh 'python -m py_compile main.py' 
            }
        }
        stage('SonarQube Scanner') { 
            agent any
            steps {
                withSonarQubeEnv('My SonarQube Server') {
                    script {
                        def sonarqubeScannerHome = tool name: 'SonarQube Scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                        sh "${sonarqubeScannerHome}/bin/sonar-scanner"
                    }
                }
                withSonarQubeEnv('My SonarQube Server') {
                    script {
                        def qg = waitForQualityGate() // Reuse taskId previously collected by withSonarQubeEnv
                        if (qg.status != 'OK') {
                            error "Pipeline aborted due to quality gate failure: ${qg.status}"
                        }
                    }
                }
            }
        }
    }
}