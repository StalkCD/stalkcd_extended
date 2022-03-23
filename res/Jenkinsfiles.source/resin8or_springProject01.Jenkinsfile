//Declarative pipeline V2 - JIRA 'DOR-59'
pipeline {
agent none

//tools used in build
tools {
maven 'mvn-3-5-0'
jdk 'jdk-1-8'
}


environment {
GIT_COMMITER_NAME = 'jenkins'
}

//options {
//  timeout(5, HOURS)
//}

stages {

  stage("preparation") {
  agent any
    // Every stage must have a steps block containing at least one step.
   steps {
     echo "preparation stage"
     sh 'mvn clean'
     }
   }

  stage('Pull') {
    agent any
    steps {
	    checkout scm
      echo "Pull Stage"
    }
  }

  stage('build') {
  agent any
    steps {
      //send build started notifications
      slackSend (color: '#FFFF00', message: "STARTED: Job ${env.JOB_NAME} on branch: '${env.BRANCH_NAME} Build Number: [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
      echo "build stage"
      sh 'mvn package'
    }
  }

  stage('test') {
    steps {
      echo "Test Stage"

    }
  }

  stage('archive') {
  agent any
  when {
    branch "Development"
  }
    steps {
      echo "archive Stage"
      archive 'target/*.jar'
    }
  }

  stage('deploy') {
    steps {
      echo "deploy Stage"
    }
  }


  //communication block


  }
}
