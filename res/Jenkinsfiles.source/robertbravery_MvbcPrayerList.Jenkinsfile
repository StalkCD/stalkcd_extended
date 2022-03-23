// A Declarative Pipeline is defined within a 'pipeline' block.
pipeline {

  // agent defines where the pipeline will run.
  agent {
    // This also could have been 'agent any' - that has the same meaning.
    label ""
    // Other possible built-in agent types are 'agent none', for not running the
    // top-level on any agent (which results in you needing to specify agents on
    // each stage and do explicit checkouts of scm in those stages), 'docker',
    // and 'dockerfile'.
  }
  
 
  
  environment {
    // Environment variable identifiers need to be both valid bash variable
    // identifiers and valid Groovy variable identifiers. If you use an invalid
    // identifier, you'll get an error at validation time.
    // Right now, you can't do more complicated Groovy expressions or nesting of
    // other env vars in environment variable values, but that will be possible
    // when https://issues.jenkins-ci.org/browse/JENKINS-41748 is merged and
    // released.
    FOO = "BAR"
  }
  
  stages {
    // At least one stage is required.
    stage("first stage") {
      // Every stage must have a steps block containing at least one step.
      steps {
        // You can use steps that take another block of steps as an argument,
        // like this.
        //
        // But wait! Another validation issue! Two, actually! I didn't use the
        // right type for "time" and had a typo in "unit".
        
          echo "We're not doing anything particularly special here."
          echo "Just making sure that we don't take longer than five minutes"
          echo "Which, I guess, is kind of silly."
         
        
      }
    }
    stage("Test Stage") {
      steps {
        echo "This is the test stage ..."
        echo "We would normally run tests here ..."
        echo "tests done ..."
      }
    }
     stage("Test Stage2") {
      steps ("step1"){
        echo "This is the test stage ..."
        echo "We would normally run tests here ..."
        echo "tests done ..."
      }
      steps ("step2"){
        echo "This is new step ..."
        echo "Perhaps run a different test ..."
        echo "tests done ..."
      }
       steps ("step3"){
        echo "This is new step ..."
        echo "Perhaps run a different test ..."
        echo "tests done ..."
      }
    }
  }
}
