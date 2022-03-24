pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo 'Building a pipeline'
      }
    }
    stage('Test') {
      steps {
        echo 'Testing pipeline'
        echo 'Still testing'
        echo 'Seems working okay'
      }
    }
    stage('In use') {
      steps {
        echo 'Start running'
      }
    }
    stage('Boom') {
      steps {
        echo 'Pipeline leakage'
      }
    }
  }
}