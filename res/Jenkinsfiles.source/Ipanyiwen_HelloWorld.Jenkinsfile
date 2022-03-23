//pipeline {
//    agent { docker { image 'maven:3.3.3' } }
//     triggers {
//        cron('0-59 * * * *')
//    }
//    stages {
//        stage('build') {
//            steps {
//                sh 'mvn --version'
//            }
//        }
//
//        stage('Test') {
//            steps {
//                sh 'echo "success!"; exit 0'
//            }
//        }
//
//        stage('deploy') {
//            steps {
//                echo "Hello, world, nice to meet you."
//            }
//        }
//    }
//    post {
//            always {
//                echo 'This will always run'
//            }
//            success {
//                echo 'This will run only if successful'
//            }
//            failure {
//                echo 'This will run only if failed'
//            }
//            unstable {
//                echo 'This will run only if the run was marked as unstable'
//            }
//            changed {
//                echo 'This will run only if the state of the Pipeline has changed'
//                echo 'For example, if the Pipeline was previously failing but is now successful'
//            }
//    }
//}

pipeline {
    agent any
    environment {
                DISABLE_AUTH = 'true'
                DB_ENGINE    = 'sqlite'
            }
    stages {

        stage('Example') {
            steps {
                sh 'printenv'
            }
        }
    }
}
