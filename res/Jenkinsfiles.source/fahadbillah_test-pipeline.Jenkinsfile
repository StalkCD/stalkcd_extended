pipeline {
  agent any
  environment {
    FOO = "foo"
  }
  stages {
    stage('Build') {
      steps {
        echo '${project_title}'
        sh 'touch README.md'
        writeFile file: 'README.md', text: '''# Pipeline Practice

        This pipeline is a practice one.'''
        
      }
      post {
        always {
          echo 'this step will always happen'

          // hipchatSend color: 'YELLOW', credentialId: 'HIPCHAT', failOnError: true, message: 'test', notify: true, room: 'Next-Level', sendAs: '', server: 'api.hipchat.com', textFormat: true, v2enabled: true
        }

        changed {
          echo 'this step will happen only if jenkins pipeline changed'
        }

        failure {
          echo 'this step will happen only if jenkins pipeline failed'
        }

        success {
          hipchatSend color: 'GREEN', credentialId: 'HIPCHAT', failOnError: true, message: '$JOB_NAME #$BUILD_NUMBER succeed ($HIPCHAT_CHANGES_OR_CAUSE) (<a href="$BUILD_URL">View build</a>)', notify: true, room: 'Next-Level', sendAs: 'Jenkins', server: '', v2enabled: false
        }

        unstable {
          echo 'this step will happen only if jenkins pipeline unstable'
        }

        aborted {
          echo 'this step will happen only if jenkins pipeline aborted'
        }
      }
    }
    stage('Test') {
      steps {
        echo 'Start testing...'
      }
    }
    stage('Publish') {
      steps {
        echo 'Start publishing...'
      }
    }
  }
}