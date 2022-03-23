#!groovy

pipeline {
  options { buildDiscarder(logRotator(numToKeepStr: '5')) }

  agent {
    node {
      label 'master'
      customWorkspace '/srv/deployment/jenkins-agent'
    }
  }
  
  checkout scm

  stages {
    stage('Update config from S3') {
      steps {
        echo 'aws s3 sync s3://pipeline-example-configurations /srv/deployments/predeploy/s3-configs'
        echo '${rubyVersion}'
      }
    }
  }
}
