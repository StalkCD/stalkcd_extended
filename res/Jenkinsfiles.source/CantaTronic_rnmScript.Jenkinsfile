pipeline {
  agent any
  stages {
    stage('') {
      steps {
        sh '''pipeline {
    agent { docker { image \'python:3.5.1\' } }
    stages {
        stage(\'build\') {
            steps {
                sh \'python --version\'
            }
        }
    }
}'''
        }
      }
    }
  }