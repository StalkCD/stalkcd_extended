def AGENT_LABEL = null

node('master') {
  stage('Checkout and set agent'){
     checkout scm
     ### Or just use any other approach to figure out agent label: read file, etc
     if (env.BRANCH_NAME == 'master') {
        AGENT_LABEL = "prod"
     } else {
        AGENT_LABEL = "dev"
     }
   }
}

pipeline {
    agent {
       label "${AGENT_LABEL}"
    }

    stages {
        stage('Normal build') {
           steps {
              echo "Running in ${AGENT_LABEL}"
              sh "hostname"
           }
        } 

        stage ("Docker build") {
           agent{
             dockerfile {
                dir 'Dockerfiles'
                label "${AGENT_LABEL}"
             }
            }
            steps{
                sh "hostname"
            }
        }
    }
}
