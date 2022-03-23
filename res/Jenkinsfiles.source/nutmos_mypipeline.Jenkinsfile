pipeline {
    agent any
    stages {
        stage('No-op') {
            steps {
                sh 'ls'
            }
        }
    }
    post {
        always {
            echo 'One way or another, I have finished'
            deleteDir() /* clean up our workspace */
        }
        success {
            mail to: 'nuttapong_mos@hotmail.com',
                subject: "Pipeline Success: ${currentBuild.fullDisplayName}",
                body: "The pipeline ${env.BUILD_URL} is build succeed."
        }
        unstable {
            echo 'I am unstable :/'
        }
        failure {
            echo 'I am failed'
        }
        changed {
            echo 'Things were different before...'
        }
    }
}
