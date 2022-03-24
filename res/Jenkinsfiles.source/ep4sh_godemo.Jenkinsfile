pipeline {
  agent any
  stages {
    stage('Build') {

            steps.timestamps {
              sh "go version"
              input "LOL?"
              sh "gcc -v"
            }

    }
 }
}

pipeline {
 agent any
 stages {
  stage ('One') {
      steps {
          sh "go version"
      }
  }   
  stage('Parallel') {
   steps {
    parallel(
     'group1': {
      timestamps {
       catchError {
        sleep 10
        echo 'Completed group1 processing'
       }
      }
     },
     'group2': {
      sleep 5
      error 'Error in group2 processing'
     },
     failFast: true
    )
   }
  }

    stage ('Last') {
      steps {
          sh "gcc -v"
      }
  }   
 }
}
