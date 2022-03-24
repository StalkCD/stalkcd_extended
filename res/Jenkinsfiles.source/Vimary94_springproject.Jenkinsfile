#!groovy

pipeline {//inicio pipe
    agent label: 'master'

    tools {//Inicio tools
        jdk 'Java 1.8.0_51-b16'
    }//fin tools


   stages {//inicio stages
        
         stage('Checkout') {//inicio stage
             
             steps {  checkout scm}
            }//cierre stage
         
        stage('Clean'){//inicio stage
          agent label: 'master'
        steps {//inicio steps
        bat 'del /F /Q "C:/Program Files (x86)/Jenkins/workspace/TestPipeline@script"'
        }//fin steps
        
}//fin stage
}//fin stages

}//fin pipeline
