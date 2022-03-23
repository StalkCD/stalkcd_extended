pipeline {
  agent any
  stages {
    stage('Initialize') {
      steps {
        parallel(
          "Initialize": {
            echo 'hello, Jenkins Visual Pipeline Editor'
            
          },
          "Initialize2": {
            echo 'Hi, Pipeline'
            
          }
        )
      }
    }
  }
}