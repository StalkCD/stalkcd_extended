pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'echo "Success!!"; exit 0'
            }
        }
    }
    post {
        always {
            echo 'Esta parte vai sempre ser executada'
        }
        success {
            echo 'Aqui vai ser executada se o build form bem sucedida'
        }
        failure {
            echo 'esta parte vai aparecer se o build falhar !!!!'
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