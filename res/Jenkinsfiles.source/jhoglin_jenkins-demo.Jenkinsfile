pipeline {
    agent none
    stages {
        stage('build') {
            agent {
                docker { image 'gradle:4.6.0-jdk8-alpine' }
            }
            steps {
                sh 'hostname'
                sh 'env | sort'
                sh 'gradle -v'
            }
        }

        stage('test') {
            parallel {
                stage('junit') {
                    agent {
                        docker { image 'gradle:4.6.0-jdk8-alpine' }
                    }
                    steps {
                        sh 'hostname'
                        sh 'env | sort'
                        sh 'sleep $[ ( $RANDOM % 10 )  + 1 ]s'
                        sh 'gradle -v'
                    }
                }
                stage('gui') {
                    agent {
                        docker { image 'maven:3-alpine' }
                    }
                    steps {
                        sh 'hostname'
                        sh 'env | sort'
                        sh 'sleep $[ ( $RANDOM % 10 )  + 1 ]s'
                        sh 'mvn -v'
                    }
                }
            }

            
        }

        stage('deploy-test') {
            failFast true
            parallel {
                stage('apache') {
                    agent any
                    steps {
                        sh 'hostname'
                        sh 'env | sort'
                        sh 'sleep $[ ( $RANDOM % 10 )  + 1 ]s'
                    }
                }
                stage('create-container') {
                    agent any
                    steps {
                        sh 'hostname'
                        sh 'env | sort'
                        sh 'sleep $[ ( $RANDOM % 10 )  + 1 ]s'
                    }
                }
            }
        }

    }
}