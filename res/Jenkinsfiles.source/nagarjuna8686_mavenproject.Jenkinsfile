pipeline {
  agent any
  stages {
    stage('scm checkout') {
      steps {
        sh '''pipeline{
    agent{
       stage(\'scm checkout\'){
          git \'https://github.com/nagarjuna8686/mavenproject.git\'
       }
     }
}'''
        }
      }
    }
  }