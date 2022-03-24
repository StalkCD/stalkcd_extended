//pipeline {
//    agent any
//    tools {maven 'maven-curso'}
//    stages{
//        stage ('Build'){
//            steps {bat 'mvn clean package'}
//            post {
//                success {
//                    echo 'Guardando...'
//                    archiveArtifacts artifacts: '**/target/*.war'
//                }
//            }
//        }
//    }
//}


//pipeline {
//    agent any
//    tools {maven 'maven-curso'}
//    stages{
//        stage ('Build'){
//            steps {bat 'mvn clean package'}
//            post {
//                success {
//                    echo 'Guardando...'
//                    archiveArtifacts artifacts: '**/target/*.war'
//                }
//            }
//        }
//        stage ('Paso a pre'){
//            steps {
//                build job: 'proyecto-deploy'
//            }
//        }
//    }
//}


pipeline {
    agent any
    tools {maven 'maven-curso'}
    stages{
        stage ('Build'){
            steps {bat 'mvn clean package'}
            post {success
                  {
                echo 'Guardando...'
                archiveArtifacts artifacts: '**/target/*.war'
            }
           }
        }
        stage ('Paso a pre') {
            steps {
                build job: 'proyecto-deploy'
            }
        }
        stage ('Paso a pro') {
            steps {
                timeout(time:5, unit:'DAYS') {
                    input message: '¿Aprobar el paso a producción?'
                }
                build job: 'despliegue-PRO'
            }
            post {success {
                echo 'Realizado el deploy a pro'
            }
                  failure {
                      echo 'Ha fallado el deploy'
                  }
                 }
        }
    }
}
