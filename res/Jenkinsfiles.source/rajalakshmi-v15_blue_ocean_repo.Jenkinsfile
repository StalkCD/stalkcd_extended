pipeline {
  agent any
  stages {
    stage('Initialize') {
      parallel {
        stage('Initialize') {
          steps {
            build 'sample_job'
          }
        }
        stage('Initialize 2') {
          steps {
            sh 'echo "This is the second stage"'
          }
        }
      }
    }
    stage('End of pipeline') {
      steps {
        echo 'End of the pipeline'
      }
    }
  }
}