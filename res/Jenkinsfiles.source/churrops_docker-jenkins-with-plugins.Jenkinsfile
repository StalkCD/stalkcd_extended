pipeline {
  agent any
  stages {
    stage('List') {
      steps {
        sh 'ls -lhtr'
        sh '''cd build
docker build -t churrops/jenkins:pipeline .'''
      }
    }
    stage('Build Container') {
      steps {
        sh '''cd build
docker build -t churrops/jenkins:pipeline .'''
      }
    }
  }
}