Jenkinsfile (Declarative Pipeline)
pipeline {
    agent { docker 'python:3.5.1' }
    stages {
        stage('build') {
            steps {
                retry(3) {
                    sh 'awscli --version'
                }
                retry(2) {
                    sh 'python --version'            
                }
            }    
        }
        stage('Sanity check') {
            steps {
                input "Does the staging environment look ok?"
            }
        }        
    }
    post {
        always {
            echo 'This is always run'
            archive 'build/libs/**/*.jar'
            junit 'build/reports/**/*.xml'
        }
        success {
            echo 'This will run only if successful'
            slackSend channel: '#tempest',
                  color: 'good',
                  message: "The pipeline ${currentBuild.fullDisplayName} completed successfully."          
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
