pipeline {
  agent any
  stages {
    stage('Stage1') {
      steps {
        echo 'Hello GitHub from sublimetext 1542'
      }
    }
    stage('Stage2') {
      steps {
        build (job: '/Case 2/Delivery_Build',  parameters: [string(name: 'yourName', value: 'valueFromPipeline')])
      }
    }
    stage('Stage3') {
      steps {
        build 'Pipeline_with_pass'
      }
    }
  }
}