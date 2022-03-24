pipeline {
    agent none
    stages {
        stage('Big sleep') {
            parallel {
                stage('Sleep 1') {
                    agent {
                        label "jenkins-ec2-agent"
                    }
                    steps {
                        sh 'date'
                        sh 'sleep 60'
                        sh 'date'    
                    }
                }
                stage('Sleep 2') {
                    agent {
                        label "jenkins-ec2-agent"
                    }
                    steps {
                        sh 'date'
                        sh 'sleep 60'
                        sh 'date'    
                    }
                }
                stage('Sleep 3') {
                    agent {
                        label "jenkins-ec2-agent"
                    }
                    steps {
                        sh 'date'
                        sh 'sleep 60'
                        sh 'date'    
                    }
                }
                stage('Sleep 4') {
                    agent {
                        label "jenkins-ec2-agent"
                    }
                    steps {
                        sh 'date'
                        sh 'sleep 60'
                        sh 'date'    
                    }
                }
                stage('Sleep 5') {
                    agent {
                        label "jenkins-ec2-agent"
                    }
                    steps {
                        sh 'date'
                        sh 'sleep 60'
                        sh 'date'    
                    }
                }                
            }    
        }
    }
}
