pipeline {
  agent any
  stages {
    stage('Deploy') {
      steps {
        sh '''echo "Hello World!!"
'''
        sh '''pipeline {
    agent { docker \'maven:3-alpine\' } 
    stages {
        stage(\'Example Build\') {
            steps {
                sh \'mvn -B clean verify\'
            }
        }
    }
}'''
        }
      }
    }
  }