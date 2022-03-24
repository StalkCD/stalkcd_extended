pipeline {
  agent {
    docker {
      image 'docker pull mo1207/hystrixdemo'
    }

  }
  stages {
    stage('') {
      agent {
        docker {
          image 'docker pull mo1207/hystrixdemo'
        }

      }
      steps {
        echo 'pipeline started'
      }
    }
  }
}