pipeline {

  agent any //this is a comment?

  environment {
    USERNAME = 'theo'
    PASSWORD = 'new_password'
  }

  stages {

    stage('jenkins_test') {
      agent any
      steps {
        echo 'In the jenkins_test stage'
        sh 'printenv'
        sh 'whoami'
      }
    }

    stage('build') {
      agent { docker { image 'python:3.4-alpine' } }
      steps {
            sh '''
                echo "Welcome to the first step in the build stage!"
                echo "The date is $(date)"
                echo "Files in $(pwd)"
                echo "hello again"
            '''
            echo "Step complete!"
            echo "USERNAME: ${USERNAME}"
            echo "PASSWORD: ${PASSWORD}"
      }
    }
  }

  post {
    always {
      echo 'POST: Pipeline has finished executing.'
      deleteDir()
    }
    success {
      echo 'POST: Pipeline was a success.'
    }
    failure {
      echo 'POST: Pipeline failed.'
    }
    unstable {
      echo 'POST: Unstable pipeline.'
    }
    changed {
      echo 'POST: The state of the Pipeline has changed.'
    }
  }

}
