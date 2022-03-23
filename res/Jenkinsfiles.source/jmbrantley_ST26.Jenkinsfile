pipeline {
  agent any
  stages {
    stage('Hello') {
      steps {
        echo 'Hello World!'
        sh '''pipeline {
   agent any
   stages {
      stage(\'Say Hello\') {
         steps {
            echo \'Hello World!\'   
            sh \'java -version\'
         }
      }
   }
}'''
        }
      }
    }
  }