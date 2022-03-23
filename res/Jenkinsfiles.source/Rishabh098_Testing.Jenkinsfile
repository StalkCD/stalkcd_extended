pipeline {
    agent any 
    stages {
        stage('build') {
            steps {
                input 'Do you want to continue!?'
                sh 'echo "Hello World!!" '
                sh '''
                   echo "Multiline View"
                   ls -lah 
                   '''
            }
        }
    }
    post {
        always {
            echo 'This will always run'
        }
        success {
            echo 'This will run only if successful'
            slackSend channel: '#himanshu',
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
