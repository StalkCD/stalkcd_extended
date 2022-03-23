@Library('toolchain-jenkins') _

pipeline {
    agent none

    stages {
        stage('Build') {
            agent any
            steps {
                echo 'Building..'
                sh 'env'
                sh 'sleep 5'
                sh 'date'
            }
        }
        stage('Test') {
            parallel {
                stage('A') {
                    agent any
                    steps {
                        echo 'Testing A...'
                        sh 'date'
                        sh 'sleep 5'
                        sh 'date'
                    }
                }
                stage('B') {
                    agent any
                    steps {
                        echo 'Testing B...'
                        sh 'date'
                        sh 'sleep 10'
                        sh 'date'
                    }
                }
                stage('C') {
                    agent any
                    steps {
                        echo 'Testing C...'
                        sh 'date'
                        sh 'sleep 30'
                        sh 'date'
                    }
                }
                stage('D') {
                    agent {
                        docker { image 'busybox' }
                    }
                    steps {
                        echo 'Testing D...'
                        sh 'date'
                        sh 'sleep 60'
                        sh 'date'
                    }
                }
                stage('E') {
                    agent any
                    steps {
                        sh 'echo "This is a test" >warning.txt'
                    }
                    post {
                        success {
                            recordGccIssues('**/warning*.txt')
                        }
                    }
                }
            }
        }
        stage('Deploy') {
            agent any
            steps {
                echo 'Deploying....'
                sh 'date'
            }
        }
    }
}
