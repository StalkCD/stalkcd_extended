#!groovy

pipeline {
  environment {
     REGHOST="myregistry.democompany.com:5000"
     BUILD_HOME="/var/lib/jenkins/workspace"
  }
  agent none
  stages {
    stage('Pipeline Started') {
      steps {
        echo "Received webhook from Git" 
      }
    }
    stage('Docker Build') {
      agent any
      steps {
        sh "docker image build -t ${REGHOST}/super-app ."
        sh "docker image tag ${REGHOST}/super-app:latest ${REGHOST}/super-app:1.${BUILD_NUMBER}"
      }
    }
    stage('Docker Push') {
      agent any
      steps {
         withCredentials([usernamePassword(credentialsId: 'RegistryLogin', passwordVariable: 'myPassword', usernameVariable: 'myUser')]) {
          sh "docker login -u ${env.myUser} -p ${env.myPassword}"
          sh "docker image push ${REGHOST}/super-app:latest"
          sh "docker image push ${REGHOST}/super-app:1.${BUILD_NUMBER}"
        }
      }
    }
 }
    post {
      always {
         cleanWs()
      }
   }
}
