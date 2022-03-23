#!/usr/bin/env groovy

@Library ('jenkins-pipeline-library') _
return pipeline {
  agent none

  stages {
    stage("Greeting") {
      agent {
        label "master"
      }
      steps {
         echo 'Hello, World!'
      }
    }
  }
}
