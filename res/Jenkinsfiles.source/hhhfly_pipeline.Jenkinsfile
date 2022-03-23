pipeline {
  agent any
  stages {
    stage('11') {
      parallel {
        stage('11') {
          agent {
            node {
              label '11'
            }
            
          }
          steps {
            node(label: 'clone') {
              echo 'hello'
            }
            
            sh '''stage(\'test\') {
       echo \'pipeline success\'
   }'''
            }
          }
          stage('21') {
            steps {
              sh '''stage(\'test21\') {
       echo \'TestNG interface test success\'
   }'''
              }
            }
          }
        }
      }
    }