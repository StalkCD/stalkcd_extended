pipeline {
  agent any
  stages {
    stage('SIT PipeLine') {
      steps {
        echo 'SIT Build Started ......'
      }
    }
    stage('SITBuild') {
      steps {
        build(job: 'SITBuild', quietPeriod: 1)
      }
    }
    stage('SITDeploy') {
      steps {
        build 'SITDeployment'
      }
    }
    stage('UAT Pipe Line') {
      steps {
        echo 'UAT Build Started .......'
      }
    }
    stage('UAT Build') {
      steps {
        build 'UATBuild'
      }
    }
    stage('UAT Deployment') {
      steps {
        build 'UATDeploy'
      }
    }
    stage('Staging PipeLine') {
      steps {
        echo 'Staging PipeLine Started '
      }
    }
    stage('Staging Build') {
      steps {
        build 'StagingBuild'
      }
    }
    stage('Staging Deployment') {
      steps {
        build 'StagingDeployment'
      }
    }
  }
}