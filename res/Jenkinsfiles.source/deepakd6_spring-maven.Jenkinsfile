#!groovy

pipeline {
  agent none
  stages {
    stage('Maven Install') {
      agent {
        docker {
          image 'maven:3.5.0'
        }
      }
      steps {
        sh 'mvn clean install'
      }
    }
    stage('Docker Build spring-boot Image') {
      agent any
      steps {
        sh 'docker build -t demo-5:latest .'
      }
    }
    stage('Docker Build MYSQL Image') {
      agent any
      steps {
        sh 'docker build -f Dockerfile -t sql-demo-5 .'
      }
    }
	stage('Docker Run MYSQL Container') {
      agent any
      steps {
        sh 'docker run sql-demo-5'
      }
    }
	stage('Docker Show Active containers') {
      agent any
      steps {
        sh 'docker ps'
      }
    }
  }
}
