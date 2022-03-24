@Library("jenkins-shared-library") _
    standardPipeline {
        projectName = "Project1"
        serverDomain = "Project1 Server Domain"
    }
pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo 'Jenkins Pipeline'
      }
    }
    stage('buildone') {
      steps {
        echo 'goodmorning'
      }
    }
    stage('buildtwo') {
      steps {
        echo 'have a nice day'
        }
      }  
    }
  }
}
