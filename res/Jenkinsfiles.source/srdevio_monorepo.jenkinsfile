pipeline {
  // Have to use none as an agent so an input stage won't block anything
  agent none

  // Build the docker image using the Jenkins agent
  stages {
    stage('Load') {
      agent any
      steps {
        //pipeline = load 'pants/Jenkinsfile'
        echo 'Loading Another Jenkinsfile'
        echo currentBuild.changeSets
      }
    }
  }
}
