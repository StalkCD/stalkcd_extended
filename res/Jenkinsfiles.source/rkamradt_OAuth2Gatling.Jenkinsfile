pipeline {
    agent any
    stages {
        stage('Start Up Server') {
            steps {
                sh '''
                    ./serverup.sh
                '''
            }
        }
        stage('Run Tests') {
            agent {
                docker {
                    image 'hseeberger/scala-sbt:8u151-2.12.5-1.1.2'
                    args '-v /var/lib/jenkins/workspace/.ivy2:/root/.ivy2'
                }
            }
            steps {
                sh 'sbt gatling:test'
            }
        }
    }
    post {
        always {
                sh '''
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