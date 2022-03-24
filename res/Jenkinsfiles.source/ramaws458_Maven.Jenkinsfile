// pipeline {
//    agent any

//    stages {
//        stage ('Compile Stage') {

//            steps {
//                withMaven(maven : 'maven_3_5_0') {
//                    sh 'mvn clean compile'
//                }
//            }
//        }
//
//        stage ('Testing Stage') {

 //           steps {
//                withMaven(maven : 'maven_3_5_0') {
//                    sh 'mvn test'
//                }
//            }
//        }


//        stage ('Deployment Stage') {
//            steps {
//                withMaven(maven : 'maven_3_5_0') {
//                    sh 'mvn deploy'
//                }
//            }
//        }
//    }
//}

pipeline {
    agent {
        docker {
            image 'maven:3-alpine' 
            args  '-v /root/.m2:/root/.m2' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'mvn -B -DskipTests clean package' 
            }
        }
    }
}