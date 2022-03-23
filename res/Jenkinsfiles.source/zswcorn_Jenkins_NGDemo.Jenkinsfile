pipeline {
    agent any
    stages {
        stage('Env Check'){
            steps{
                sh 'npm -v'
                sh 'node -v'
            }
        }
        stage('Env Install'){
            steps{
                sh 'npm update'
                sh 'npm install'
            }
        }
        stage('Build First') {
            steps {
                echo 'Try Building...'
                sh 'npm run build'
            }
        }
        stage('Then Test') {
            steps {
                echo 'Testing...'
            }
        }
        stage('Finally Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
    post{
        always{
            echo 'Always do this.'
        }
        success{
            echo 'Only Success do this.'
        }
        failure{
            echo 'Only Failure do this.'
        }
        unstable{
            echo 'This will run only if the run was marked as unstable'
        }
        changed {
            echo 'This will run only if the state of the Pipeline has changed'
            echo 'For example, if the Pipeline was previously failing but is now successful'
        }
        fixed{
            echo 'Only run the steps in post if the current Pipeline’s or stage’s run is successful and the previous run failed or was unstable.'
        }
        regression{
            echo 'Only run the steps in post if the current Pipeline’s or stage’s run’s status is failure, unstable, or aborted and the previous run was successful.'
        }
        aborted{
            echo 'Only run the steps in post if the current Pipeline’s or stage’s run has an "aborted" status, usually due to the Pipeline being manually aborted. This is typically denoted by gray in the web UI.'
        }
        cleanup{
            echo 'Run the steps in this post condition after every other post condition has been evaluated, regardless of the Pipeline or stage’s status.'
        }
    }
}