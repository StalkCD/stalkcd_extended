pipeline {
    /* agent { docker 'python:3.5.1' } */
    /* agent any */
    agent {
        /* docker { image 'node:7-alpine' } */
        docker { image 'node:alpine' }
    }
    stages {
        stage('build') {
            environment {
                ATONG_PUB_SSH = credentials('ATONG_PUB_SSH')
            }
            steps {
                echo 'Building...'
                sh 'echo "Hello World!"'
                sh '''
                    uname -a
                    date
                '''
                /* sh 'python --version' */ /* python not found in Alpine docker image */
                /* sh 'echo "${env.ATONG_PUB_SSH}"' */
                sh 'echo "$ATONG_PUB_SSH"'
            }
        }
        stage('test') {
            steps {
                echo 'Testing...'
                sh 'node --version'
            }
        }
        stage('deploy (staging)') {
            steps {
                echo 'Deploying Staging...'
            }
        }
        stage('sanity check') {
            steps {
                input "Did QA sign off on Staging?"
            }
        }
        stage('deploy (production)') {
            steps {
                echo 'Deploying Production...'
            }
        }
    }
    post {
        always {    /* this will always run */
            echo "All done!  8)"
            /* collect test results and artifacts */
            archive 'build/libs/**/*.jar'  /* grab built artifacts for local analysis/investigation */
            hipchatSend room: 'VMedix Staging',
                message: "Pipeline run completed: ${currentBuild.fullDisplayName}",
                color: 'PURPLE'
        }
        success {    /* runs when successful */
            echo "Pipeline succeeded!  :)"
            mail to: 'patrick.raco@comtechtel.com',
                subject: "Jenkins: Executed Pipeline [SUCCESS]: ${currentBuild.fullDisplayName}",
                body: "Pipeline all done: ${env.BUILD_URL}\nStatus: Succeeded\n"
            hipchatSend room: 'VMedix Staging',
                message: "Executed Pipeline [SUCCESS]: ${currentBuild.fullDisplayName}",
                color: 'GREEN'
        }
        unstable {    /*  runs when marked as unstable */
            echo "Pipeline is unstable.  :/"
        }
        failure {    /* runs if failed */
            echo "Pipeline failed!  :("
            mail to: 'patrick.raco@comtechtel.com',
                subject: "Jenkins: Executed Pipeline [FAILED]: ${currentBuild.fullDisplayName}",
                body: "Pipeline all done: ${env.BUILD_URL}\nStatus: Failed\n"
            hipchatSend room: 'VMedix Staging',
                message: "Executed Pipeline [FAILED] - Job Name: ${env.JOB_NAME} - Job No. #${env.BUILD_NUMBER}",
                color: 'RED'
        }
        changed {    /* runs if state of Pipeline has changed, e.g. previously failed, but now succeeded */
            echo "Pipeline status changed.  :|"
        }
    }
}
