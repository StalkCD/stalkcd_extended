pipeline {
  agent any
  stages {
    stage('Stage1') {
      steps {
        echo 'Pipeline1 test'
      }
    }
    stage('Stage2') {
      agent any
      steps {
        sh '''#! /bin/bash

echo "Hello Pipeline!!"'''
      }
    }
    stage('Stage3') {
      steps {
        echo 'Stage 3 test'
      }
    }
  }
}