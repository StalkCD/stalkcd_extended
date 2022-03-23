pipeline {
    agent none
    stages {
        stage('Back-end') {
            agent {
                docker { image 'maven:3-alpine' }
            }
            steps {
                sh 'cd server && mvn -B -DskipTests clean package'
                sh 'cd server && java -jar target/app-0.0.1-SNAPSHOT.jar'
            }
        }
    }
}

pipeline {
	agent none
    stages {
        stage('Front-end') {
            agent {
                docker { image 'node:7-alpine' }
            }
            steps {
                sh 'node --version'
            }
        }
    }
}