pipeline {
  agent any
  stages {
    stage('Add a file') {
      agent any
      steps {
        writeFile(file: 'test.txt', text: 'created using pipeline')
      }
    }
    stage('') {
      agent any
      steps {
        echo 'Completed!!!!'
      }
    }
  }
  environment {
    filename = 'test.txt'
  }
}