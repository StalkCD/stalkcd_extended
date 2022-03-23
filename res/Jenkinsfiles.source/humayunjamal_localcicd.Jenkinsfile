#!/bin/env groovy

pipeline {
  agent none
  stages {
    stage('Test') {
      agent any
      steps {
        script {
            echo "TESTING : Probably mvn clean test"
        }
      }
    }
    stage('Build') {
      agent {
        docker {
          image 'maven'
        }
      }
      steps {
          sh 'mvn package'
          sh 'cp -R target /pipeline-dev/'
      }
    }
    stage('Deploy Code') {
      agent any
      steps {
        script {
            sh (returnStatus: true, script: "docker stop my-maven-project")
            sh (returnStatus: true, script: "docker rm my-maven-project")
            sh 'docker build -t helloworld .'
            sh 'docker run -it -d -p 8080:8080 --name my-maven-project helloworld:latest'
        }
      }
    }
    stage('HealthCheck') {
      agent any
      steps {
        script {
            timeout(time: 5, unit: 'MINUTES') {
            sh 'until $(curl --output /dev/null --silent --head --fail http://192.168.99.100:8080); do echo ".";sleep 5;done'
            echo 'The app is now responding please check locally'
             }
        
        }
      }
    }
  }
}
