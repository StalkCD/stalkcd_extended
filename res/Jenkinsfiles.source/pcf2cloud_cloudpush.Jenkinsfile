pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        git(url: 'https://github.com/pcf2cloud/cloudpush.git', branch: 'master', changelog: true, poll: true)
        echo 'build pipeline==========='
      }
    }
  }
}