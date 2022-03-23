pipeline {
  agent any
  stages {
    stage('Checkout Rep 1') {
      steps {
        git(url: 'https://github.com/Syncroness-Inc/JenkinsPipelineTest1.git', branch: 'master', credentialsId: 'SyncronessTestToken')
      }
    }
    stage('Checkout Rep2') {
      steps {
        git(url: 'https://github.com/Syncroness-Inc/JenkinsPipelineTest2.git', branch: 'master', credentialsId: 'SyncronessTestToken')
      }
    }
    stage('Do something') {
      steps {
        bat(script: 'echo:Hello world', returnStatus: true, returnStdout: true)
      }
    }
  }
}