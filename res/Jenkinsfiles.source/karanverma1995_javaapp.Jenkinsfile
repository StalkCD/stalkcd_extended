pipeline {
 agent none
 stages {
  stage('QA') {
    agent {
            docker { 
                  image 'kv1995/javaapp:latest' 
                 }
          } 
    steps {
      echo 'Deploying in QA' 
      sh '/usr/local/tomcat/bin/startup.sh'
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
                  image 'kv1995/javaapp:latest'
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
