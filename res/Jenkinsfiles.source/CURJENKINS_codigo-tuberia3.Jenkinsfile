//pipeline {agent any stages{stage ('Inicial'){steps {echo 'Estoy en la fase inicial'}}stage ('Etapa 2') {steps {echo 'Hola'}}}}
pipeline {
  agent any 
  parameters {
    string(name: 'tomcat_pre', defaultValue: 'localhost:8090', description: 'Servidor de pre')
    string(name: 'tomcat_prod', defaultValue: 'localhost:9090', description: 'Servidor de pro')
  }
  triggers {
    pollSCM('* * * * *');
  }
  tools {
    maven 'maven-curso'
  }
  stages{
    stage ('Build'){
      steps {
        bat 'mvn clean package'
      }
    post { 
      success { 
        echo 'Guardando....' 
        archiveArtifacts artifacts: '**/target/*.war'
      }
    }
  }
    stage ('Paso a pre') {
      parallel{
        stage ('Deploy to Staging') {
      steps {
        bat "cp -i /home/jenkins/tomcat-demo.pem **/tarjet/*.war ec2- user@$S{params.tomcat_dev}:/var/lib/tomcat7/webapp"
        ****************
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

//pipeline {  agent any   tools {    maven 'maven-curso'  }  stages{    stage ('Build'){      steps {        bat 'mvn clean package'      }    post {       success {         echo 'Guardando....'         archiveArtifacts artifacts: '**/target/*.war'      }    }  }}}
//pipeline {  agent any   tools {    maven 'maven-curso'  }  stages{    stage ('Build'){      steps {        bat 'mvn clean package'      }    post {       success {         echo 'Guardando....'         archiveArtifacts artifacts: '**/target/*.war'      }    }  }    stage ('Paso a pre') {      steps {        build job: 'realizar-deploy'      }    }}}
//pipeline {  agent any   tools {    maven 'maven-curso'  }  stages{    stage ('Build'){      steps {        bat 'mvn clean package'      }    post {       success {         echo 'Guardando....'         archiveArtifacts artifacts: '**/target/*.war'      }    }  }    stage ('Paso a pre') {      steps {        build job: 'realizar-deploy'      }    }        stage ('Paso a pro') {      steps {        timeout(time:5, unit:'DAYS') {          input message: 'Aprobar el paso a producción?'        }        build job: 'deploy-produccion'      }      post {        success {          echo 'Realizado el deploy a pro'        }        failure {          echo 'Ha fallado el deploy'        }      }    }}}
