// A Declarative Pipeline is defined within a 'pipeline' block.
pipeline {
    // the agent that the tasks will execute on
    // set by { label = "name" } or any 
  agent any
 
  // set an environment variable
  environment {
    CONFIG = "configuration_99_XYZ"
  }
 
  // the pipeline consists of one or more stages
  stages {
    stage("Prepare Test Environment") {
      // Every stage must have a steps block containing at least one step.
      steps {
          echo "Preparing the environment ..."
          echo "$CONFIG"
        }
      }    
    
    stage("Build Application") {
      steps {
          echo "Building the application ... "
          echo "zzzzzzzzzzzzzzzzzzzzzz       "
      }
    }

    stage("Run Browser Tests") {
      steps {
        parallel(
            Chrome: {
                  echo "Testing on Chrome"
                 },
                 
            Firefox: {
                   echo "Testing on Firefox"
                 },
            Opera: {
                   echo "Testing on Opera"
                 })
      }
    }
  }
  
  post {
    // Always runs and runs before any of the other post conditions
    always {
        echo "Cleaning up ..."
    }
   }
}
