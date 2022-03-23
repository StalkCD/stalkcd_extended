pipeline {
  agent none
  stages {
    stage('DevelopDeploy'){
      agent { node {label 'dev'} }
      when {
        branch 'dev'
      }
      steps{
        sh 'ls -lha'
        sh '''#! /bin/bash
                if [ ! -d "/usr/share/nginx/html/pipeline/" ]; then
                  mkdir -p /usr/share/nginx/html/pipeline/
                  cp index.html /usr/share/nginx/html/pipeline/index.html
                else
                  cp index.html /usr/share/nginx/html/pipeline/index.html
                fi
        '''
      }
    }
    stage('TestDeploy'){
      agent { node {label 'test'} }
      when {
        branch 'master'
      }
      steps{
        sh 'ls -lha'
        sh '''#! /bin/bash
                if [ ! -d "/usr/share/nginx/html/pipeline/" ]; then
                  mkdir -p /usr/share/nginx/html/pipeline/
                  cp index.html /usr/share/nginx/html/pipeline/index.html
                else
                  cp index.html /usr/share/nginx/html/pipeline/index.html
                fi
        '''
      }
    }
  }
}
