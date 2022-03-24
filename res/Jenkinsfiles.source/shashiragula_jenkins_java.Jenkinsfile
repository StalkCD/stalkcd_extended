pipeline {
    agent any 
    stages {
        stage(‘SCMCheckout’) {
 //           agent { docker 'maven:3-alpine' } 
            steps {
                echo 'SCM Checkout stage'
                sh 'java -version'
            }
        }
	stage('Build') {
 //           agent { docker 'maven:3-alpine' } 
            steps {
                echo 'Build Stage'
                sh 'java -version'
            }
        }
        stage('Test') {
 //         agent { docker 'openjdk:8-jre' } 
            steps {
                echo 'Test Stage'
                sh 'java -version'
                input message: "Does http://http://34.228.54.224:8080/job/test_pipeline/ look good?"
            }
        }
    stage('Deploy') {
//            agent { docker 'openjdk:8-jre' } 
            steps {
                echo 'Deploy Stage'
                sh 'java -version'
            }

        }
    }
}
