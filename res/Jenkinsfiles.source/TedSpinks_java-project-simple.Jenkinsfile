pipeline {
  agent any

/*
  options {
    //Issue: If you find that the "GitHub Hook Trigger" option in your Project has been 
    //mysteriously un-checked, then remove buildDiscarder from the pipeline, and check the 
    //"Discard old builds" checkbox in the project, instead (it does the exact same thing).
    buildDiscarder(logRotator(numToKeepStr: '2', artifactNumToKeepStr: '1'))
  }
*/

  stages {
    stage('Unit Testing'){
      steps {
        echo '********************* Unit testing... *********************'
        sh 'ant -f test.xml -v'
        junit 'reports/result.xml'
      }
    }
    stage('Build'){
      steps {
        echo '********************* Building... *********************'
        sh 'ant -f build.xml -v'
        archiveArtifacts artifacts: 'dist/*.jar', fingerprint: true
        stash(name:'jarfile', includes:"dist/rectangle_${env.BUILD_NUMBER}.jar")
      }
    }
    stage('Test'){
      steps {
        echo '********************* Testing... *********************'
        sh "chmod u+x dist/rectangle_${env.BUILD_NUMBER}.jar"
        sh "java -jar dist/rectangle_${env.BUILD_NUMBER}.jar 4 5"
      }
    }
    stage('Deploy to Apache Agent'){
      agent {
        label 'apache'
      }
      steps {
        echo '********************* Deploying to Apache Agent... *********************'
        unstash(name:'jarfile')
        sh "cp dist/rectangle_${env.BUILD_NUMBER}.jar /var/www/html/rectangles/all"
      }
    }
    stage('Test on Debian'){
      agent {
        docker 'openjdk:8u171-jre-alpine'
      }
      steps {
        echo '********************* Testing on Debian... *********************'
        sh "wget http://gtspinks-119d80501.mylabserver.com/rectangles/all/rectangle_${env.BUILD_NUMBER}.jar"
        sh "java -jar rectangle_${env.BUILD_NUMBER}.jar 4 5"
      }
    }
    stage('Promote to Green'){
      
      steps {
        unstash(name:'jarfile')
        sh "cp dist/rectangle_${env.BUILD_NUMBER}.jar /var/www/html/rectangles/green"
      }
    }
  }
  post {
    always {
      echo 'Post/Always'
      //archiveArtifacts artifacts: 'dist/*.jar', fingerprint: true
    } 
  }
}