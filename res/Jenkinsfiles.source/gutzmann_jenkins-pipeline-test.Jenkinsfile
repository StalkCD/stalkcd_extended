pipeline {
    agent none
    triggers { pollSCM('* * * * *') }
    stages {
        stage('get versions from docker') {
            parallel {
                stage('maven') {
                    agent {
                        docker { image 'maven' }
                    }

                    steps {
                        sh 'mvn --version'
                        sh 'java -version'
                    }
                }

                stage('npm') {
                    agent { docker { image 'node' } }
                    steps {
                        sh 'npm --version'
                        sh 'node --version'
                    }

                }
                stage('python') {
                    agent { docker { image 'python' } }
                    steps {
                        sh 'python --version'
                    }
                }
                stage('gradle') {
                    agent { docker { image 'gradle' } }
                    steps {
                        sh 'gradle --version'
                        sh 'java -version'
                    }
                }
            }
        }
    }
}
