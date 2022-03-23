#!/usr/bin/env groovy
@Library('jenkins-library@master') _

pipeline {
  agent {
    node {
      label 'docker'
    }
  }

  triggers {
    pollSCM('* * * * *')
  }

  stages {
    stage('Build') {
      steps {
        sh 'docker-compose build'
      }
    }
    stage('Push') {
      steps {
        sh 'docker-compose push'
      }
    }
  }
  post {
    always {
      sendNotification currentBuild.result
    }
    failure {
      // notify users when the Pipeline fails
      mail to: 'gerd@aschemann.net',
        subject: "Failed Docker-Maven Pipeline: ${currentBuild.fullDisplayName}",
        body: "Something is wrong with ${env.BUILD_URL}"
    }
  }
}
