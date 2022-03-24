// DO NOT EDIT
// Automatically generated from the following template in wrsinc/etc:
// https://github.com/wrsinc/etc/blob/master/roles/ci/templates/Jenkinsfile.j2

// A Declarative Pipeline is defined within a 'pipeline' block.
pipeline {
  // agent defines where the pipeline will run.

  agent {
    // This also could have been 'agent any' - that has the same meaning.

    label ''
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

    ACTIVITY_URL = "${BLUEOCEAN_PIPELINE_URL}/retailer/activity"
  }

  options {
    // Set a timeout period for the Pipeline run, after which Jenkins should
    // abort the Pipeline.

    timestamps()
    timeout(time: 30, unit: 'MINUTES')
  }

  stages {
    // At least one stage is required.

    stage('Build') {
      // Every stage must have a steps block containing at least one step.

      steps {
        script {
          job_name = sh(
            returnStdout: true,
            script: """
              echo ${JOB_NAME} \
              | sed -e 's|/|/detail/|'
            """
          ).trim()
        }
        script {
          BLUEOCEAN_URL = sh(
            returnStdout: true,
            script: """
              echo "${BLUEOCEAN_PIPELINE_URL}/${job_name}/${BUILD_NUMBER}/pipeline/"
            """
          ).trim()
        }

        configFileProvider([
          configFile(fileId: 'settings.xml', variable: 'SETTINGS')
        ]) {
          sh 'make build'
        }
      }
    }

    stage('Test') {
      // You can override tools, environment and agent on each stage if you want.

      steps {
        sh 'make test'
      }
    }

    stage('*** Deploy *** poc-tier1') {
      when {
        expression {
          return (
            BRANCH_NAME == 'master' \
              || BRANCH_NAME == 'deploy-to-poc-tier1'
          )
        }
      }

      steps {
        configFileProvider([
          configFile(
            fileId: 'gcloud-service-account-credentials-poc-tier1.json',
            variable: 'GCLOUD_SERVICE_ACCOUNT_CREDENTIALS'
          )
        ]) {
          sh "PROJECT='poc-tier1' make deploy"
        }
      }
    }
  }

  post {
    // Always runs at end of job


    success {
      slackSend (
        color: (
        (
          BRANCH_NAME == 'master'
            || BRANCH_NAME == 'deploy-to-poc-tier1'
            || BRANCH_NAME == 'deploy-to-performance-tier1'
        ) ?
            "#326de6" :
            "#228B22"
        ),
        message: (
          (
            BRANCH_NAME == 'master'
              || BRANCH_NAME == 'deploy-to-poc-tier1'
              || BRANCH_NAME == 'deploy-to-performance-tier1'
          ) ?
            "Job: ${JOB_NAME} [${BUILD_NUMBER}] *SUCCESS*\nLog: ${BLUEOCEAN_URL}\nDeployment: _poc-tier1_ " :
            "Job: ${JOB_NAME} [${BUILD_NUMBER}] *SUCCESS*\nLog: ${BLUEOCEAN_URL}\nPR: \"${env.CHANGE_TITLE}\", ${env.CHANGE_AUTHOR_DISPLAY_NAME}, ${env.CHANGE_URL}\n"
        )
      )
    }

    failure {
      slackSend (
        color: "#8B0000",
        message: (
          (
            BRANCH_NAME == 'master'
              || BRANCH_NAME == 'deploy-to-poc-tier1'
              || BRANCH_NAME == 'deploy-to-performance-tier1'
          ) ?
            "Job: ${JOB_NAME} [${BUILD_NUMBER}] *FAILURE*\nLog: ${BLUEOCEAN_URL}\nDeployment: _poc-tier1_ " :
            "Job: ${JOB_NAME} [${BUILD_NUMBER}] *FAILURE*\nLog: ${BLUEOCEAN_URL}\nPR: \"${env.CHANGE_TITLE}\", ${env.CHANGE_AUTHOR_DISPLAY_NAME}, ${env.CHANGE_URL}\n"
        )
      )
    }
  }
}
