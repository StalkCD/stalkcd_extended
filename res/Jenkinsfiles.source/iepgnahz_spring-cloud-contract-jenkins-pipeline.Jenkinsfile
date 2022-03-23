pipeline {
    agent any

    stages {
        stage('start maven repo') {
            steps {
                sh 'docker-compose -f ./assembly/docker/docker-compose.yml up -d'
            }
        }

        stage('provider integration test') {
            agent {
                docker {
                    image 'java:8'
                    reuseNode true
                    args  '-v /Users/pezhang/Demo/spring-cloud/spring-cloud-contract-demo/provider-service:/var/app/provider-service --network my_pipeline --network--alias provider'
                }
            }

            steps {
                sh 'cd /var/app/provider-service && ./gradlew clean test'
            }
        }

        stage('provider publish') {
            agent {
                docker {
                    image 'java:8'
                    args  '-v /Users/pezhang/Demo/spring-cloud/spring-cloud-contract-demo/provider-service:/var/app/provider-service --network my_pipeline --network--alias provider-publish'
                }
            }
            steps {
                sh 'cd /var/app/provider-service && ./gradlew --status && ./gradlew clean test publish'
            }
        }

        stage('consumer integration test') {
            agent {
                docker {
                    image 'java:8'
                    args  '-v /Users/pezhang/Demo/spring-cloud/spring-cloud-contract-demo/consumer:/var/app/consumer --network my_pipeline --network--alias consumer'
                }
            }
            steps {
                sh 'cd /var/app/consumer && ./gradlew clean test'
            }
        }
    }

    post {
        always {
            echo 'This will always run'
            deleteDir()
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