pipeline {
    agent any

    stages {
        stage('Initialize') {
            agent {
                kubernetes {
                    label "${env.BRANCH_NAME}-node"
                    containerTemplate {
                        name 'node'
                        image 'node:8-jessie'
                        ttyEnabled true
                        command 'cat'
                    }
                }
            }
            steps {
                container('node') {
                    sh 'npm install -g serverless'
                }
                echo "${env.JOB_NAME}"
            }
        }
        
        stage('Testing') {
            agent {
                kubernetes {
                    label 'k8s-pipeline-node'
                    containerTemplate {
                        name 'node'
                        image 'node:8-jessie'
                        ttyEnabled true
                        command 'cat'
                    }
                }
            }
            steps {
                container('node') {
                    sh 'npm install -g serverless'
                }
            }
        }

        stage('Deploy') {
            agent {
                kubernetes {
                    label 'k8s-pipeline-php'
                    containerTemplate {
                        name 'php'
                        image 'php'
                        ttyEnabled true
                        command 'cat'
                    }
                }
            }
            steps {
                container('php') {
                    sh 'php -v'
                }
                sh 'tar -zcvf kubernetes-pipeline-artifact.tar.gz Jenkinsfile'
                archiveArtifacts artifacts: 'kubernetes-pipeline-artifact.tar.gz', fingerprint: true
            }
        }
    }
}
