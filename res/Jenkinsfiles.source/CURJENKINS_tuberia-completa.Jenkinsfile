//pipeline {agent any stages{stage ('Inicial'){steps {echo 'Estoy en la fase inicial'}}stage ('Etapa 2') {steps {echo 'Hola'}}}}
//pipeline {  agent any  tools {maven 'maven-curso'}  stages{    stage ('Build'){      steps {bat 'mvn clean package'}      post {        success {          echo 'Guardando....'          archiveArtifacts artifacts: '**/target/*.war'        }     }    }  }}
pipeline {
  agent any
  tools {
    maven 'maven-curso'
  }
  stages{
    stage ('Build'){
      steps {
        build job: 'mi-primer-job-maven'
      }
    }
    stage ('Paso a pre') {
      steps {
        build job: 'realizar-deploy'
      }
    }
    stage ('Paso a pro') {
      steps {
        timeout(time:5, unit:'DAYS') {
          input message: 'Aprobar el paso a producción?'
        }
        build job: 'deploy-produccion'
      }
      post {
        success {
          echo 'Realizado el deploy a pro'
        }
        failure {
          echo 'Ha fallado el deploy'
        }
      }
    }
  }
}
//pipeline {  agent any   tools {    maven 'maven-curso'  }  stages{    stage ('Build'){      steps {        bat 'mvn clean package'      }    post {       success {         echo 'Guardando....'         archiveArtifacts artifacts: '**/target/*.war'      }    }  }    stage ('Paso a pre') {      steps {        build job: 'realizar-deploy'      }    }}}
//pipeline {  agent any   tools {    maven 'maven-curso'  }  stages{    stage ('Build'){      steps {        bat 'mvn clean package'      }    post {       success {         echo 'Guardando....'         archiveArtifacts artifacts: '**/target/*.war'      }    }  }    stage ('Paso a pre') {      steps {        build job: 'realizar-deploy'      }    }        stage ('Paso a pro') {      steps {        timeout(time:5, unit:'DAYS') {          input message: 'Aprobar el paso a producción?'        }        build job: 'deploy-produccion'      }      post {        success {          echo 'Realizado el deploy a pro'        }        failure {          echo 'Ha fallado el deploy'        }      }    }}}
