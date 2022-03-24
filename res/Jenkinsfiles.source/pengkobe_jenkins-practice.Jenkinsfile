Jenkinsfile (Declarative Pipeline)
pipeline {
    agent { docker { image 'node:8.9' } }

    environment {
        BUILD_URL    = 'jenkins-practice'
    }

    stages {
        stage('build') {
            steps {
                sh 'printenv'
                retry(2) {
                    sh 'npm --version'
                }
                timeout(time: 1, unit: 'MINUTES') {
                    sh 'node --version'
                }
            }
        }
        stage('deploy') {
            sh 'ls'
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
            mail to: 'yipeng.info@gmail.com',
                 subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
                 body: "Something is wrong with ${env.BUILD_URL}"
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