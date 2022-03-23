pipeline {
 agent none
 stages {
  stage('QA') {
    agent {
            docker { 
                  image 'sudheer552/sudher1docker:docker1' 
                 }
          } 
    steps {
      echo 'Deploying in QA' 
      input('Do you want to Continue the pipeline ?')
   }
  }

  stage('Remove Dangling Docker Images') {
    steps {
      sh 'docker images -q -f dangling=true && docker rmi $(docker images -q -f dangling=true) || echo "Nope"'
    }
  }

  stage('Staging') {
    agent  {
            docker {
                  image 'sudheer552/sudher1docker:docker1'
                 }
          }

    steps {
      echo 'Deploying in Staging'
      input('Do you want to Continue the pipeline ?')
   }
  }

  stage('Remove Dangling Docker Images 2') {
    steps {
      sh 'docker images -q -f dangling=true && docker rmi $(docker images -q -f dangling=true) || echo "Nope"'
    }
  }
 }
}

