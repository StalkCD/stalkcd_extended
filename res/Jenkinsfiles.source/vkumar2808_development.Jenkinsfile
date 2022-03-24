pipeline {
  agent any

//to keep number of artifacts
  options {
    buildDiscarder(logRotator(numToKeepStr: '2', artifactNumToKeepStr: '1'))
  }
  stages {
    stage('build') {
      steps {
      echo "Hello This is my first pipeline project"
      }
    }
  }
    stage('build') {
      steps {
      echo "Hello This is my first pipeline project"
      "/usr/bin/docker pull nginx"
      }
    }
  
 // stage ("Test on Debian") {
//    agent {
  //    docker 'openjdk:8u121-jre'
  //  }
 // }
  // this is for post build action and archive artifacts to match with fingerprint
  post {
    always {
      //archiveArtifacts artifacts: 'dist/*.jar', fingerprint: true
      echo "This is for archiveArtifacts fingerprint"
    }
  }
}
