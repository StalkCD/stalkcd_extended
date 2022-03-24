pipeline {
    agent any 
    stages {
        stage('Clone repo and clean it') {
            steps {
                sh "rm -rf Pipleline"
                sh "git clone https://github.com/LuckyReddyGIT/Pipeline.git"
                sh "mvn clean -f Pipeline"
            }
        }
        stage('Test') {
            steps {
                sh "mvn test -f Pipeline"
            }
        }
        stage('Deploy') {
            steps {
                sh "mvn package -f Pipeline"
            }
        }
    }
}
