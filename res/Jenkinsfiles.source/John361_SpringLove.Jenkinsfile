pipeline {

    agent {
        node("linux-agent-with-docker") {
           docker.image('jdk-8').inside {
                git 'https://github.com/takari/maven-wrapper.git'
                // begin the sh step with "env &&" for troubleshooting, no need in real life
                sh 'env && ./mvnw effective-settings'
            }
        }
    }
    stages {
        stage('Test') {
            steps {
                sh './crazy.sh'
            }
        }

        stage('build') {
            steps {
                sh 'mvn install'
                sh 'mvn compile'
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