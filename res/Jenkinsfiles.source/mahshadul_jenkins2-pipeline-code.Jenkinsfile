//pipeline{
//    agent any
//    stages{
//        stage("Build Master"){
//            when {
//                branch 'master'
//            }
//            steps {
//                echo 'Building Master'
//            }
//        }
//        stage("Build Dev"){
//            when {
//                branch 'dev'
//            }
//            steps {
//                echo 'Building Dev'
//            }
//        }
//    }
//}

// Declarative pipeline
//pipeline{
//    agent any
//    stages{
//        stage("Build"){
//            when {
//                tag "2.0"
//            }
//            steps {
//                echo 'Building based on tag'
//            }
//        }
//
//    }
//}


//Scripted pipeline

node {
    if(env.BRANCH_NAME == 'master'){
        stage('Build Master'){
            echo 'Building master'
        }
    }
    if(env.BRANCH_NAME == 'dev'){
        stage('Build Dev'){
            echo 'Building dev'
        }
    }
} 

