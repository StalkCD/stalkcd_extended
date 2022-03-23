pipeline {
    agent {
        docker { image 'node:7-alpine' }
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
            }
        }
    }
}
//pipeline {
//    agent {
//        docker { image 'cthulhuology/carton' }
//    }
//    stages {
//        stage('Test') {
//            steps {
//                sh '''
//                    echo "Running tests..."
//                    carton install --deployment
//                    prove -lv t
//                '''
//            }
//        }
//    }
//}
