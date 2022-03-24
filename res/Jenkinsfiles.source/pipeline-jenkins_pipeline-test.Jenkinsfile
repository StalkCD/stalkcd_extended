pipeline {
  agent any
  stages {
    stage('checkout') {
      steps {
        echo 'Checkout stage'
      }
    }
    stage('compile') {
      steps {
        echo 'Compile stage'
      }
    }
    stage('test') {
      steps {
        parallel(
          "Unit tests": {
            echo 'Parallel test stage 1'
            
          },
          "Integration tests": {
            echo 'Parallel test stage 2'
            
          },
          "Functional tests": {
            echo 'Parallel test stage 3'
            
          }
        )
      }
    }
    stage('package') {
      steps {
        echo 'Package stage'
      }
    }
    stage('deploy') {
      steps {
        echo 'Deploy stage'
      }
    }
  }
  post {
    always {
      echo 'Post pipeline action - always'
      
    }
    
    changed {
      echo 'Post pipeline action - changed'
      
    }
    
    failure {
      echo 'Post pipeline action - failure'
      
    }
    
    success {
      echo 'Post pipeline action - success'
      
    }
    
    unstable {
      echo 'Post pipeline action - stable'
      
    }
    
  }
}
