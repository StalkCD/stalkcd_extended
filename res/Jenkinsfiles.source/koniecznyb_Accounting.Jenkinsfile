pipeline {
    agent none 
    stages {
        stage('SQL') {
            agent { dockerfile { dir 'accountingBackend' } } 
            steps {
                echo 'Hello, Maven'
                sh 'mvn --version'
            }
        }
        stage('Backend') {
            agent { dockerfile { dir 'accountingBackend' } } 
            steps {
                echo 'Hello, Maven'
                sh 'mvn --version'
            }
        }
        stage('Frontend') {
            agent { dockerfile { dir 'accountingBackend' } } 
            steps {
                echo 'Hello, JDK'
                sh 'java -version'
            }
        }
    }
}