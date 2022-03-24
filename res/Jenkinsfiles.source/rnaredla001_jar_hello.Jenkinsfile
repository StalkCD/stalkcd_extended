pipeline {
   options {
    buildDiscarder(logRotator(numToKeepStr: '50', artifactNumToKeepStr: '50'))
  }
agent any 
stages {
   stage ('compile stage') {
   steps {
    sh 'mvn compile'
    }
   }
   stage ('test stage') {
   steps {
   sh 'mvn test'
     }
   }
   stage ('package') {
   steps {
      sh 'mvn package'
      }
   }
   stage ('Deploying to Nexus') {
   steps {
      sh 'mvn deploy'
      }
   }
   stage("Docker build") {
      steps {
         sh "docker build -t hello${BUILD_NUMBER}:Latest ."
      }
   }
   stage("Docker login") {
      steps {
        sh 'docker login -u reddydevops -p szumuqiz'
        }
      }
   stage("Docker push") {
      steps {
         sh "docker push hello${BUILD_NUMBER}"
      }
    }
    }
   post {
        always {
           junit 'target/surefire-reports/*.xml'
        }
        success {
            archiveArtifacts artifacts: '**/*.jar', fingerprint: true
            archiveArtifacts artifacts: 'target/***', fingerprint: true
        }
        failure {
          echo 'JENKINS PIPELINE WAS MARKED AS UNSTABLE'
        }
        unstable {
            echo 'JENKINS PIPELINE WAS MARKED AS UNSTABLE'
        }
        changed {
            echo 'JENKINS PIPELINE STATUS HAS CHANGED SINCE LAST EXECUTION'
        }
    }
}
