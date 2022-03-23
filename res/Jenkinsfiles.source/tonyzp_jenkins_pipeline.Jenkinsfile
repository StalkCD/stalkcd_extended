pipeline {
  agent any
  stages {
    stage('Prepare') {
      steps {
        sh '''echo "Prepare build..."

pipeline_run_script_path=`pwd`

echo "pipeline_run_script_path = $pipeline_run_script_path"

echo "USERNAME = $USERNAME"

echo "PASSWORD = $PASSWORD"'''
      }
    }
    stage('Build') {
      steps {
        sh '''echo "Building..."

echo "Building succeed!"'''
      }
    }
  }
  environment {
    USERNAME = 'tp'
    PASSWORD = '123456'
  }
}