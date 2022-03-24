Jenkinsfile (Declarative Pipeline)

pipeline {
    //agent directive: tell Jenkins where and how to execute the Pipeline
    //required for all pipelines
    agent docker{ image 'node:7-alpine'}
    stages {
        stage('build') {
           steps {
                sh 'python --version'
		sh 'echo "hi hi"'
            }
        }
    }
}

post {
        always {
            echo 'One way or another, I have finished'
            deleteDir() /* clean up our workspace */
        }
        success {
            echo 'I succeeeded!'
        }
        unstable {
            echo 'I am unstable :/'
        }
        failure {
            echo 'I failed :('
        }
        changed {
            echo 'Things were different before...'
        }
    }