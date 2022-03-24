/*
  Declarative pipeline example

  urls:
    https://jenkins.io/doc/book/pipeline/getting-started/
    https://jenkins.io/doc/book/pipeline/jenkinsfile/
		https://jenkins.io/doc/book/pipeline/syntax
*/

pipeline {
  /*
    this can also be a labelled worker agent
    agent { label 'slave1' }
    agent any
    node { label 'slave1' }
    node any
  */
  agent { docker { image 'python:3.5.1' } }

  environment {
    FOO = 'bar'
    MESSAGE = 'hello world'
  }

  /* timeout this job in X mins */
  options {
    timeout(10)
  }

  stages {

    stage('setup') {
      steps {
        sh '''
          echo hello world
          echo mary had a little lamb
          pwd
          id
        '''
      }
    }

    stage('build') {

      /* we are on the master branch, but for some reason this
      step was skipped
      */

      //when {
      //  branch '*/master'
      //}

      steps {
        sh 'python --version'
      }
    }

    stage('test') {
      steps {
        sh 'python --version'
      }
    }

    stage('deploy') {
      when {
        expression {
          currentBuild.result == null || currentBuild.result == 'SUCCESS'
        }
      }
      steps {
        sh 'uname -a; id'
      }
    }

  }

  /* notification
  post {
    success {
      mail to: "user@gmail.com",
      subject: "SUCCESS: ${currentBuild.fullDisplayName}",
      body: "yay, we passed"
    }
    failure {
      mail to: "user@gmail.com",
      subject: "FAILURE: ${currentBuild.fullDisplayName}",
      body: "boo, we failed"
    }
  }
  */

}
