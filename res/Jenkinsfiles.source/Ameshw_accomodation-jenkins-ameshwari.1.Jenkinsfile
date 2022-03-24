pipeline{
  agent any
    stages{
      stage('Checkout'){
        steps{
          checkout scm!'
      }
    }
      //Building the web-app
     stage('Build web-app'){
        steps{
          sh 'mvn -f /home/robot/.jenkins/workspace/test-jenkins-pipeline/hoteljsf'
      }
    }
      //Building the web-services
     stage('Build web-service'){
        steps{
          sh 'mvn -f /home/robot/.jenkins/workspace/test-jenkins-pipeline/hoteljsf'
'
      }
    }
  }
}
