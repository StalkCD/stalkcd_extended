#!groovy

pipeline {
  agent none
  stages {
    stage('Maven Test') {
      agent {
        docker {
          image 'maven:3.3.3'
        }
      }
      steps {
        sh 'mvn test'
      }
    }
    stage('Maven Install') {
      agent {
        docker {
          image 'maven:3.3.3'
        }
      }
      steps {
        sh 'mvn clean install'
      }
    }
    stage('Docker Build') {
      agent any
      steps {
        sh 'docker build -t dockerdonegal/helloworld:v4 .'
      }
    }
    stage('Docker Push') {
      agent any
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerHub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
          sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
          sh 'docker push dockerdonegal/helloworld:v4'
        }
      }
    }
    stage('Docker Clean') {
      agent any
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerHub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
          sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
          sh 'docker push dockerdonegal/helloworld:v4'
        }
      }
    }
    stage('Docker Pull') {
      agent any
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerHub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
          sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
          sh 'docker pull dockerdonegal/helloworld:v4'
        }
      }
    }
    stage('Docker Deploy STG') {
      agent any
      steps {
          sh "docker run -d -p 85:8080 dockerdonegal/helloworld:v4"
      }
    }
    stage('Integration/E2E Tests') {
      agent any
      steps {
          sh 'echo ADDSTEP - Integration/E2E Tests'

      }
    }
    stage('Deploy PROD') {
      agent any
      steps {
          sh "docker run -d -p 82:8080 dockerdonegal/helloworld:v4"
      }
    }
  }
}


// node('docker') {
// node {

//     checkout scm

//     stage('Build') {
//         docker.image('maven:3.3.3').inside {
//             sh 'mvn --version'
//         }
//     }

// }

// pipeline {
//     agent {
//         docker {
//             image 'maven:3-alpine' 
//             args '-v /root/.m2:/root/.m2' 
//         }
//     }
//     stages {
//         stage('Build') { 
//             steps {
//                 sh 'mvn -B -DskipTests clean package' 
//             }
//         }
//     }
// }
