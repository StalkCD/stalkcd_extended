#!/usr/bin/env groovy
properties([
  pipelineTriggers([
    upstream(
      threshold: 'SUCCESS',
      upstreamProjects: 'https://github.com/Sireddy669/sireddy2.git'
    )
  ])
])

pipeline {
    agent any 

    stages {
        stage('Build') { 
            steps { 
                sh 'pwd' 
            }
        }
        stage('Test'){
            steps {
                sh 'java -version'
                
            }
        }
        stage('Deploy') {
            steps {
                sh 'ls'
                sh 'pwd'
              
              agent any

    parameters {
        booleanParam(defaultValue: "TEST", description: 'What environment?', name: 'userFlag')
        // choices are newline separated
        choice(choices: 'US-EAST-1\nUS-WEST-2', description: 'What AWS region?', name: 'region')
    }
    
        }
    }
}
}
