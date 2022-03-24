-/* Requires the Docker Pipeline plugin */
 -node('docker') {
 -    checkout scm
 -    stage('Build') {
 -        docker.image('python:3.5.1').inside {
 -            bat 'python --version'
 -        }
 -    }
 -}
 -
 -/* Requires the Docker Pipeline plugin */
 -node('docker') {
 -    checkout scm
 -    stage('Build') {
 -        docker.image('python:3.5.1').inside {
 -            sh 'python --version'
 +Jenkinsfile (Declarative Pipeline)
 +pipeline {
 +    agent { docker 'maven:3.3.3' }
 +    stages {
 +        stage('build') {
 +            steps {
 +                sh 'mvn --version'
 +            }
          }
      }
  }
