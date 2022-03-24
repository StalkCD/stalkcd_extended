pipeline {
    agent any
    stages {
        stage('Compile') {
            steps {
                sh 'mvn install'
            }
        }
        stage('Start Up Server') {
            steps {
                sh '''
                    cd server
                    ./serverup.sh
                '''
            }
        }
        stage('Run Tests') {
            agent {
                docker {
                    image 'maven:3.5-alpine'
                    args '-v /var/lib/jenkins/workspace/.m2:/root/.m2'
                }
            }
            steps {
                sh '''
                    cd test
                    mvn install
                '''
            }
        }
    }
    post {
        always {
                sh '''
                    cd server
                    ./serverdown.sh
                '''
        }
        success {
            echo 'This will run only if successful'
        }
        failure {
            echo 'This will run only if failed'
        }
        unstable {
            echo 'This will run only if the run was marked as unstable'
        }
        changed {
            echo 'This will run only if the state of the Pipeline has changed'
            echo 'For example, if the Pipeline was previously failing but is now successful'
        }
    }
}