#!/usr/bin/groovy

def currentUser() {
  return openshift.project().replace("-jenkins", "").trim();
}


pipeline {
  agent any;
  stages {
    stage('Init') {
      steps {
        script {
          openshift.withCluster() {
            def currentUser = currentUser()
            echo "Hello from ${openshift.cluster()}'s default project: ${openshift.project()} User ${currentUser}"

            openshift.withProject("${currentUser}") {
              echo "Cleaning up old resources"
              openshift.selector( 'dc', [ environment:'osio-pipeline-test' ] ).delete()

              echo "Creating Bootstrap pipeline"
              openshift.create(
                openshift.process(
                  "-f", "osio-pipeline-build.yaml"
                )
              )
            }
          }
        }
      }
    }
  }
}
