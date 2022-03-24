#!groovy
def application, git, environment, artifactory, sonar

node {
   agent none


   stages {
      stage ("Checkout SCM") {
         steps {
            checkout scm

         }
      }

      stage ("build") {
         steps {
            sh "docker-compose -p master down"
            sh "echo 'port=80' > .env"
            sh "docker-compose -p master build"
         }
      }
      stage ("deploy"){
         steps{
          sh "docker-compose -p master up -d"
         }
      }

   }

   post {
      // always {

      //  }
      success {
         sh "echo 'Pipeline reached the finish line!'"

      }
      failure {
         sh "echo 'Pipeline failed'"
         // Notify in Slack
         //Clean the execution workspace
         //deleteDir()
      }
      unstable {
         sh "echo 'Pipeline unstable :-('"
      }
      
   }
}
