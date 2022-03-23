pipeline {
  agent none
  stages {
    stage('Initialize') {
      agent {
        dockerfile {
          filename 'src/Dockerfile'
        }

      }
      steps {
        echo 'This is minimal pipeline'
      }
    }
  }
}