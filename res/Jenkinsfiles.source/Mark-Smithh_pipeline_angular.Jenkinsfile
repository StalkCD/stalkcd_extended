//https://jenkins.io/doc/book/pipeline/syntax/#agent
def appVersion = '1.0'
def buildNumber = env.BUILD_NUMBER
pipeline {
  agent none
    stages {
        stage('Angular Build') {
            agent { dockerfile true } //USE DOCKERFILE AT REPOSITORY ROOT
            steps {
              sh 'ls -al'
              //sh 'ng build' //run this command inside Container
              //sh 'ls -al'
            }
        }
        stage('Niginx Setup'){

        }
    }
}
