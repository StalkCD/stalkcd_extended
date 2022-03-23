pipeline {
    agent none
    options {
        skipDefaultCheckout() 
    }
    stages {
         stage ('GitCheckout') {
            agent {
                docker {
                    image 'maven:3.5'
                    label 'dind'
                }
            }
            steps {
                echo env.BRANCH_NAME
                checkout scm
            }
        }
        stage ('Build') {
            agent {
                    label 'dind'
            }
               steps {
                sh 'curl -L https://github.com/docker/compose/releases/download/1.14.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose'
                sh 'chmod +x /usr/local/bin/docker-compose'
                sh 'ls -alrt'
                sh 'docker-compose up &'
                sh 'sleep 30'
               }

            post {
                success {
                    echo "Build stage completed"
                }
                failure {
                    echo "Build stage failed"
                }
            }
        }
        stage('test'){
            agent {
                    label 'dind'
            }
            steps{
                sh 'curl localhost:5000'
            }
        }
    }
    post {
        success {
            echo 'Your predix-cicd-java pipeline has completed.'
        }
        failure {
            echo "There was an error in the predix-cdcd-java pipeline build"
        }
    }
}
