pipeline {
  agent {
    docker {
      image 'image \'maven:3.5.2-jdk-9'
    }

  }
  stages {
    stage('Hello World') {
      agent any
      steps {
        sh '''pipeline {
   agent any
    
   stages {
      stage(\'Say Hello\') {
         steps {
            echo \'Hello World!\'   
         }
      }
   }
}'''
        }
      }
    }
  }