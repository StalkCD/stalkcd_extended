pipeline {
    agent none
    stages {
        stage('Build') {
            agent any
            steps {
                sh 'mvn install'
            }
        }
        stage('Test') {
            agent { label 'pipe_test' }
            tools { maven 'M2_HOME' }
            steps {
                sh 'mvn test'
            }
        }
        stage('Skip test') {
            agent { label 'pipe_skiptest' }
            tools { maven 'M2_HOME' }
            steps {
                sh 'mvn install -Dmaven.test.skip=true'
            }
        }
    }
}
