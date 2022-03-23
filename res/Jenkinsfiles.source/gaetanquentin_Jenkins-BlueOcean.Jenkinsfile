pipeline {
  agent {
    node {
      label 'master'
    }
    
  }
  stages {
    stage('First Ocean') {
      agent {
        node {
          label 'master'
        }
        
      }
      steps {
        echo 'My first pipeline with blueocean'
        waitUntil() {
          sleep 10
        }
        
      }
    }
  }
  environment {
    OCEAN1 = 'TRUC'
  }
}