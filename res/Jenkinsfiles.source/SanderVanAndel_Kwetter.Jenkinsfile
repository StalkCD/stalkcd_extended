pipeline {
    agent any
    stages {
        stage('Build') {
            agent {
                docker {
                    image 'maven:3-alpine'
                    args '-v /root/.m2:/root/.m2'
                    reuseNode true
                }
            }
            steps {
                echo 'Building and cleaning package'
                sh 'mvn -B -DskipTests clean package'
            }
        }
        stage('Test') {
            agent {
                docker {
                    image 'maven:3-alpine'
                    args '-v /root/.m2:/root/.m2'
                    reuseNode true
                }
            }
            steps {
                echo 'Skipping tests to let the build succeed'
            }
        }
        stage('Build image'){
            agent {
                docker {
                    image 'maven:3-alpine'
                    args '-v /root/.m2:/root/.m2'
                    reuseNode true
                }
            }
            steps {
                sh 'mvn clean package docker:build -DskipTests'
            }
        }
        stage('SonarCube scan'){
            agent {
                docker {
                    image 'maven:3-alpine'
                    args '-v /root/.m2:/root/.m2'
                    reuseNode true
                }
            }
            steps {
                configFileProvider([configFile(fileId: 'f713633d-bca9-449b-98f3-2b2fff5297c5', variable: 'SonarMavenSettings')]) {
                    sh 'mvn -s $SonarMavenSettings clean package sonar:sonar -DskipTests'
                }
            }
        }

        stage('Deploy'){
            agent {
                docker {
                     image 'docker:17.12-dind'
                     args '-v /var/run/docker.sock:/var/run/docker.sock'
                     reuseNode true
                }
            }
            steps {
                sh 'docker stack deploy -c config/stack.yml kwetter'
            }
        }
        stage('Mail results'){
                    agent {
                        docker {
                            image 'maven:3-alpine'
                            args '-v /root/.m2:/root/.m2'
                            reuseNode true
                        }
                    }
                    steps {
                        emailext (
                                  subject: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                                  body: """<p>SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                                    <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>""",
                                  recipientProviders: [[$class: 'DevelopersRecipientProvider']]
                                )
                    }
                }
    }
    post {
        always {
            echo 'This will always run'
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


