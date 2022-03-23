pipeline {
  agent {
    docker {
      image 'ubuntu'
      args 'latest'
    }

  }
  stages {
    stage('First stage') {
      steps {
        sh 'echo "Hello"'
        echo 'Hello This is a first pipeline'
      }
    }
  }
  environment {
    Name = 'test'
  }
}