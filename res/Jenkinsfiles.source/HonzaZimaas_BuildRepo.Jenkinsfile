pipeline {
  agent any
  stages {
    stage('test') {
      parallel {
        stage('test') {
          steps {
            echo 'Ahoj'
          }
        }
        stage('') {
          steps {
            build '10'
          }
        }
      }
    }
  }
}
pipeline('Aha') {
  agent any
  stages {
    stage('haha') {
      parallel {
        stage('haha') {
          steps {
            echo 'Ahoj'
          }
        }
        stage('') {
          steps {
            build '10'
          }
        }
      }
    }
  }
}
