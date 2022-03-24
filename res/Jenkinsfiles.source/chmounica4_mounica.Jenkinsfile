#!/usr/bin/env groovy
properties([
       [$class: 'GithubProjectProperty',
       displayName: '',
       projectUrlStr: 'https://github.com/chmounica4/mounica.git/'],
       pipelineTriggers([githubPush()])
       ])

properties([pipelineTriggers([upstream('Demo-monic')])])

pipeline {
    agent any 
    
    stages {
       stage('Build 1') { 
            steps { 
                echo 'make changes hie'
            }
        }
        stage('Build 2') { 
            steps { 
                echo 'make changes hie '
            }
         }
         stage('Test'){
            steps {
                echo 'make check changes'
            }
        }
        stage('Deploy') {
            steps {
                echo 'make publish'
            }
        }
    }
}
