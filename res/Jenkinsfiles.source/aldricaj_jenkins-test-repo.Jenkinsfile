pipeline {
    agent any
    stages {
        
        stage('Install packages') { 
            agent {
                docker {
                    image 'python:3.6.4' 
                }
            }
            steps {
                sh 'pip install --no-cache-dir -r requirements.txt' 
            }
        }
        
        stage('Test') { 
            agent {
        docker {
            image 'python:3.6.4' 
        }
    }
            steps {
                sh 'python3 -m unittest discover --verbose' 
            }
        }
        
        stage('Build docker image') {
            agent { docker {
                image 'benhall/dind-jenkins-agent:latest'
            } }
            steps {
	            sh 'docker login'
                sh 'docker build . -t aldricaj/image:latest'   
	            sh 'docker push aldricaj/image:latest' 
            }
        }
    }
}
