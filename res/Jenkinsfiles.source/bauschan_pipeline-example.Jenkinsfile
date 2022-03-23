pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo 'Building..'
      }
    }
    stage('Test') {
      steps {
        parallel(
          "Test": {
            sh 'echo \'foo\''
            
          },
          "Unix": {
            isUnix()
            
          },
          "Write workspace": {
            writeFile(file: 'target/test.txt', text: 'foo')
            
          }
        )
      }
    }
    stage('Deploy') {
      steps {
        parallel(
          "Deploy": {
            echo '"Hello, ${env.GREETINGS_TO} !"'
            sh 'echo "Hello, TYPO3 Dev Days 2017 !"'
            script {
              def pipelineType = 'declarative'
              echo "yeah we executed a script within the ${pipelineType} pipeline"
            }
            
            
          },
          "Archive": {
            archiveArtifacts 'target/*'
            
          }
        )
      }
    }
    stage('Production') {
      steps {
        echo 'All done'
      }
    }
  }
  environment {
    JENKINS_URL = 'platform_example'
  }
  parameters {
    string(name: 'company_parameter', defaultValue: 'dkd', description: 'The company the pipeline runs in')
  }
}