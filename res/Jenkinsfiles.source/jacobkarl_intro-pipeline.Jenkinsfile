pipeline {
  agent none
  stages {
    stage('One') {
      agent any
      steps {
        echo 'Stage One - Step 1'
      }
    }
    stage('Checkpoint') {
      steps {
        checkpoint 'Checkpoint'
      }
    }
    stage('Two') {
      agent any
      steps {
        echo 'Stage Two - Step 1'
      }
    }
  }
}