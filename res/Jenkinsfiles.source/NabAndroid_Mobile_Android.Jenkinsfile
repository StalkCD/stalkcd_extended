pipeline {
  agent none

  stages{
    stage("SCM Checkout"){
      steps{
        node('master') { // this is equivalent to 'agent any'
          echo "Checkout the SCM stage"
          checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'Git_Jenkins', url: 'https://github.com/NabAndroid/Mobile_Android.git']]])
        }
      }
    }
    stage("Running tests") {
      agent any
      steps {
        sh './gradlew test'
        }
      }
    stage("Getting the tasks list") {
      agent any
      steps {
        sh './gradlew tasks'
        }
      }
  }
  post {
      success {
          slackSend (message: "Android Pipeline was successfull")
    }
      failure {
          slackSend (message: "Android Pipeline was unsuccessfull")
     }
   }
}

