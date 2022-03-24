#!/usr/bin/env groovy
pipeline {
  agent { label 'mesos-qa-uswest2' }
  // Version 0.0.1
  // Generated: 18 Oct 18 14:58 PDT
  // ManifestID: github.com/opentable/sous-demo
  options {
    // Set to 1 day to allow people to input whether they want to go to Prod on the Master branch build/deploys
    timeout(time: 1, unit: 'DAYS')
  }
  parameters {
    string(defaultValue: 'semver_timestamp', description: 'How sous determines build / deploy version', name: 'SOUS_VERSIONING_SCHEME')
      string(defaultValue: 'YES', description: 'Execute Static Tests', name: 'SOUS_STATIC_TEST')
      string(defaultValue: 'make static', description: 'Static Tests Command', name: 'SOUS_STATIC_TEST_COMMAND')
      string(defaultValue: 'YES', description: 'Execute Unit Tests', name: 'SOUS_UNIT_TEST')
      string(defaultValue: 'make unit', description: 'Unit Tests Command', name: 'SOUS_UNIT_TEST_COMMAND')
      string(defaultValue: 'YES', description: 'Execute Smoke Tests', name: 'SOUS_SMOKE_TEST')
      string(defaultValue: 'make smoke', description: 'Smoke Tests Command', name: 'SOUS_SMOKE_TEST_COMMAND')
      string(defaultValue: 'YES', description: 'Execute Integration Tests', name: 'SOUS_INTEGRATION_TEST')
      string(defaultValue: 'make integration', description: 'Integration Tests Command', name: 'SOUS_INTEGRATION_TEST_COMMAND')
      string(defaultValue: 'YES', description: 'Deploy to CI', name: 'SOUS_DEPLOY_CI')
      string(defaultValue: 'NO', description: 'Test to run after CI', name: 'SOUS_POST_CI_TEST')
      string(defaultValue: 'make post-ci-test', description: 'Test Command to run after CI', name: 'SOUS_POST_CI_TEST_COMMAND')
      string(defaultValue: 'YES', description: 'Deploy to PP', name: 'SOUS_DEPLOY_PP')
      string(defaultValue: 'NO', description: 'Test to run after PP', name: 'SOUS_POST_PP_TEST')
      string(defaultValue: 'make post-pp-test', description: 'Test Command to run after PP', name: 'SOUS_POST_PP_TEST_COMMAND')
      //Note we can make this a pop-up if people want to be be gated and asked if deploy to prod (manual check before prod push)
      string(defaultValue: 'YES', description: 'Deploy to PROD', name: 'SOUS_DEPLOY_PROD')
      string(defaultValue: 'NO', description: 'Test to run after Prod', name: 'SOUS_POST_PROD_TEST')
      string(defaultValue: 'make post-prod-test', description: 'Test Command to run after Prod', name: 'SOUS_POST_PROD_TEST_COMMAND')
      //Could introduce the negative, if SOUS_USE_RC == 'YES', then don't deploy to other environments
      string(defaultValue: 'NO', description: 'Deploy to RC', name: 'SOUS_USE_RC')
	  //If yes, the deploy step will wait a day asking if should continue deploying to PROD
      string(defaultValue: 'YES', description: 'Ask user before deploying to PROD', name: 'SOUS_DEPLOY_PROD_QUERY_USER')
  }
  stages {
    //Immediately send github PR all checks that this pipeline will be checking
    stage('Git statuses tests') {
      parallel {
        stage('Static') {
          when{
            expression { params.SOUS_STATIC_TEST == 'YES' }
          }
          steps {
            githubNotify context: 'Jenkins/Test/Static-Check', description: 'Static Check Tests', status: 'PENDING'
          }
        }
        stage('Unit') {
          when{
            expression { params.SOUS_UNIT_TEST == 'YES' }
          }
          steps {
            githubNotify context: 'Jenkins/Test/Unit', description: 'Unit Tests', status: 'PENDING'
          }
        }
        stage('Smoke') {
          when{
            expression { params.SOUS_SMOKE_TEST == 'YES' }
          }
          steps {
            githubNotify context: 'Jenkins/Test/Smoke', description: 'Smoke Tests', status: 'PENDING'
          }
        }
        stage('Integration') {
          when{
            expression { params.SOUS_INTEGRATION_TEST == 'YES' }
          }
          steps {
            githubNotify context: 'Jenkins/Test/Integration', description: 'Integration Tests', status: 'PENDING'
          }
        }
      }
    }
    stage('Git statuses build') {
      steps {
        githubNotify context: 'Jenkins/Build', description: 'Build', status: 'SUCCESS'
          githubNotify context: 'Jenkins Overall Success', description: 'Pipeline Status', status: 'PENDING'
      }
    }
    stage('Git statuses deploy CI') {
      when{
        branch 'master'
          expression { params.SOUS_DEPLOY_CI == 'YES' }
      }
      steps {
        githubNotify context: 'Jenkins/Deploy/CI-SF', description: 'Deploy to CI-SF', status: 'PENDING'
          githubNotify context: 'Jenkins/Deploy/CI-USWEST2', description: 'Deploy to CI-USWEST2', status: 'PENDING'

      }
    }
    stage('Git statuses Post CI Test') {
      when{
        branch 'master'
          expression { params.SOUS_POST_CI_TEST == 'YES' }
      }
      steps {
        githubNotify context: 'Jenkins/Test/Post/CI', description: 'Post Test of CI', status: 'PENDING'
      }
    }
    stage('Git statuses deploy PP') {
      when{
        branch 'master'
          expression { params.SOUS_DEPLOY_PP == 'YES' }
      }
      steps {
          githubNotify context: 'Jenkins/Deploy/PP-SF', description: 'Deploy to PP-SF', status: 'PENDING'
          githubNotify context: 'Jenkins/Deploy/PP-USWEST2', description: 'Deploy to PP-USWEST2', status: 'PENDING'

      }
    }
    stage('Git statuses Post PP Test') {
      when{
        branch 'master'
          expression { params.SOUS_POST_PP_TEST == 'YES' }
      }
      steps {
        githubNotify context: 'Jenkins/Test/Post/PP', description: 'Post Test of PP', status: 'PENDING'
      }
    }
    stage('Git statuses PROD') {
      when{
        branch 'master'
          expression { params.SOUS_DEPLOY_PROD == 'YES' }
      }
      steps {
        githubNotify context: 'Jenkins/Deploy/PROD-USWEST2', description: 'Deploy to PROD-USWEST2', status: 'PENDING'
          githubNotify context: 'Jenkins/Deploy/PROD-LN', description: 'Deploy to PROD-LN', status: 'PENDING'
          githubNotify context: 'Jenkins/Deploy/PROD-SC', description: 'Deploy to PROD-SC', status: 'PENDING'
      }
    }
    stage('Git statuses Post Prod Test') {
      when{
        branch 'master'
          expression { params.SOUS_POST_PROD_TEST == 'YES' }
      }
      steps {
        githubNotify context: 'Jenkins/Test/Post/PROD', description: 'Post Test of Prod', status: 'PENDING'
      }
    }
    stage('Git statuses RC') {
      when{
        branch 'master'
          expression { params.SOUS_USE_RC == 'YES' }
      }
      steps {
        githubNotify context: 'Jenkins/Deploy/RCCI-SF', description: 'Deploy to RCCI-SF', status: 'PENDING'
          githubNotify context: 'Jenkins/Deploy/RCPP-SF', description: 'Deploy to RCPP-SF', status: 'PENDING'
          githubNotify context: 'Jenkins/Deploy/RCPROD-SC', description: 'Deploy to RCPROD-SC', status: 'PENDING'
      }
    }
    stage('Inited Values') {
      steps {
        echo "BUILD_NUMBER=$BUILD_NUMBER"
          echo "BRANCH_NAME=$BRANCH_NAME"
          echo "NODE_NAME=$NODE_NAME"
          echo "NODE_LABELS=$NODE_LABELS"
          echo "BUILD_URL=$BUILD_URL"
          script {
            def notifier = new org.gradiant.jenkins.slack.SlackNotifier()

              env.SLACK_CHANNEL = '#team-eng-sous-bots, #tech-deploy'

              notifier.notifyStart()
          }
      }
    }
    stage('Test'){
      parallel {
        stage('Static') {
          when{
            expression { params.SOUS_STATIC_TEST == 'YES' }
          }
          agent { label 'mesos-qa-uswest2' }
          steps {
            withEnv(["CMD_TO_EXECUTE=${params.SOUS_STATIC_TEST_COMMAND}"]) {
              script {
                def executecmd = new com.opentable.sous.ExecuteCmd()
                executecmd.execute()
              }
            }
          }
          post {
            success {
              githubNotify context: 'Jenkins/Test/Static-Check', description: 'Static Check Tests Passed', status: 'SUCCESS'
            }
            failure {
              githubNotify context: 'Jenkins/Test/Static-Check', description: 'Static Check Tests Failed', status: 'FAILURE'
            }
          }
        }
        stage('Unit') {
          when{
            expression { params.SOUS_UNIT_TEST == 'YES' }
          }
          agent { label 'mesos-qa-uswest2' }
          steps {
            withEnv(["CMD_TO_EXECUTE=${params.SOUS_UNIT_TEST_COMMAND}"]) {
              script {
                def executecmd = new com.opentable.sous.ExecuteCmd()
                executecmd.execute()
              }
            }
          }
          post {
            success {
              githubNotify context: 'Jenkins/Test/Unit', description: 'Unit Tests Passed', status: 'SUCCESS'
            }
            failure {
              githubNotify context: 'Jenkins/Test/Unit', description: 'Unit Tests Failed', status: 'FAILURE'
            }
          }
        }
        stage('Smoke') {
          when{
            expression { params.SOUS_SMOKE_TEST == 'YES' }
          }
          agent { label 'mesos-qa-uswest2' }
          steps {
            withEnv(["CMD_TO_EXECUTE=${params.SOUS_SMOKE_TEST_COMMAND}"]) {
              script {
                def executecmd = new com.opentable.sous.ExecuteCmd()
                executecmd.execute()
              }
            }
          }
          post {
            success {
              githubNotify context: 'Jenkins/Test/Smoke', description: 'Smoke Tests Passed', status: 'SUCCESS'
            }
            failure {
              githubNotify context: 'Jenkins/Test/Smoke', description: 'Smoke Tests Failed', status: 'FAILURE'
            }
          }
        }
        stage('Integration') {
          when{
            expression { params.SOUS_INTEGRATION_TEST == 'YES' }
          }
          agent { label 'mesos-qa-uswest2' }
          steps {
            withEnv(["CMD_TO_EXECUTE=${params.SOUS_INTEGRATION_TEST_COMMAND}"]) {
              script {
                def executecmd = new com.opentable.sous.ExecuteCmd()
                executecmd.execute()
              }
            }
          }
          post {
            success {
              githubNotify context: 'Jenkins/Test/Integration', description: 'Integration Tests Passed', status: 'SUCCESS'
            }
            failure {
              githubNotify context: 'Jenkins/Test/Integration', description: 'Integration Tests Failed', status: 'FAILURE'
            }
          }
        }
      }
    }
    stage('Determine SOUS_TAG') {
      agent { label 'mesos-qa-uswest2' }
      steps {
        script {
          def tag = new com.opentable.sous.Tag()
            tag.execute()
        }
        echo "SOUS_TAG = ${env.SOUS_TAG}"
      }
    }
    stage('Determine SOUS_USER') {
      agent { label 'mesos-qa-uswest2' }
      steps {
        script {
          def tag = new com.opentable.sous.User()
            tag.execute()
        }
        echo "SOUS_USER = ${env.SOUS_USER}"
      }
    }
    stage('Determine SOUS_EMAIL') {
      agent { label 'mesos-qa-uswest2' }
      steps {
        script {
          def tag = new com.opentable.sous.Email()
            tag.execute()
        }
        echo "SOUS_EMAIL= ${env.SOUS_EMAIL}"
      }
    }
    stage('Build') {
      options {
        timeout(time: 30, unit: 'MINUTES')
      }
      steps {
        echo 'Build in Jenkinsfile'
          retry(2) {
            script {
              def build = new com.opentable.sous.Build()
                build.execute()
            }
          }
        echo 'leaving Jenkinsfile stage build'
      }
      environment {
        SOUS_CMD_TAG = "latest"
      }
      post {
        success {
          githubNotify context: 'Jenkins/Build', description: 'Build', status: 'SUCCESS'
        }
        failure {
          githubNotify context: 'Jenkins/Build', description: 'Build', status: 'FAILURE'
        }
      }
    }
    stage('master branch deploy CI'){
      when{
        branch 'master'
        expression { params.SOUS_DEPLOY_CI == 'YES' }
      }
      parallel {
        stage('Deploy ci-sf') {
          when{
            expression { params.SOUS_DEPLOY_CI == 'YES' }
          }
          agent { label 'mesos-qa-uswest2' }
          options {
            timeout(time: 5, unit: 'MINUTES')
          }
          steps {
            retry(4) {
              script {
                def deploy = new com.opentable.sous.Deploy()
                  deploy.execute()
              }
            }
          }
          environment {
            SOUS_CLUSTER = "ci-sf"
          }
          post {
            success {
              githubNotify context: 'Jenkins/Deploy/CI-SF', description: 'Deploy to CI-SF', status: 'SUCCESS'
            }
            failure {
              githubNotify context: 'Jenkins/Deploy/CI_SF', description: 'Deploy to CI-SF', status: 'FAILURE'
            }
          }
        }
        stage('Deploy ci-uswest2') {
          when{
            expression { params.SOUS_DEPLOY_CI == 'YES' }
          }
          agent { label 'mesos-qa-uswest2' }
          options {
            timeout(time: 5, unit: 'MINUTES')
          }
          steps {
            retry(4) {
              script {
                def deploy = new com.opentable.sous.Deploy()
                  deploy.execute()
              }
            }
          }
          environment {
            SOUS_CLUSTER = "ci-uswest2"
          }
          post {
            success {
              githubNotify context: 'Jenkins/Deploy/CI-USWEST2', description: 'Deploy to CI-USWEST2', status: 'SUCCESS'
            }
            failure {
              githubNotify context: 'Jenkins/Deploy/CI-USWEST2', description: 'Deploy to CI-USWEST2', status: 'FAILURE'
            }
          }
        }
        stage('Deploy rcci-sf') {
          when{
            expression { params.SOUS_DEPLOY_CI == 'YES' }
            expression { params.SOUS_USE_RC == 'YES' }
          }
          agent { label 'mesos-qa-uswest2' }
          options {
            timeout(time: 5, unit: 'MINUTES')
          }
          steps {
            retry(4) {
              script {
                def deploy = new com.opentable.sous.Deploy()
                  deploy.execute()
              }
            }
          }
          environment {
            SOUS_CLUSTER = "rcci-sf"
          }
          post {
            success {
              githubNotify context: 'Jenkins/Deploy/RCCI-SF', description: 'Deploy to RCCI-SF', status: 'SUCCESS'
            }
            failure {
              githubNotify context: 'Jenkins/Deploy/RCCI-SF', description: 'Deploy to RCCI-SF', status: 'FAILURE'
            }
          }
        }
	  }
	}
        stage('Test Post CI') {
          when{
            expression { params.SOUS_POST_CI_TEST == 'YES' }
			branch 'master'
          }
          agent { label 'mesos-qa-uswest2' }
          steps {
            withEnv(["CMD_TO_EXECUTE=${params.SOUS_POST_CI_TEST_COMMAND}"]) {
              script {
                def executecmd = new com.opentable.sous.ExecuteCmd()
                executecmd.execute()
              }
            }
          }
          post {
            success {
              githubNotify context: 'Jenkins/Test/Post/CI', description: 'Post CI Tests Passed', status: 'SUCCESS'
            }
            failure {
              githubNotify context: 'Jenkins/Test/Post/CI', description: 'Post CI Tests Failed', status: 'FAILURE'
            }
          }
        }
    stage('master branch deploy PP'){
      when{
        branch 'master'
        expression { params.SOUS_DEPLOY_PP == 'YES' }
      }
      parallel {
        stage('Deploy pp-sf') {
          when{
            expression { params.SOUS_DEPLOY_PP == 'YES' }
          }
          agent { label 'mesos-qa-uswest2' }
          options {
            timeout(time: 5, unit: 'MINUTES')
          }
          steps {
            retry(4) {
              script {
                def deploy = new com.opentable.sous.Deploy()
                  deploy.execute()
              }
            }
          }
          environment {
            SOUS_CLUSTER = "pp-sf"
          }
          post {
            success {
              githubNotify context: 'Jenkins/Deploy/PP-SF', description: 'Deploy to PP-SF', status: 'SUCCESS'
            }
            failure {
              githubNotify context: 'Jenkins/Deploy/PP-SF', description: 'Deploy to PP-SF', status: 'FAILURE'
            }
          }
        }
        stage('Deploy pp-uswest2') {
          when{
            expression { params.SOUS_DEPLOY_PP == 'YES' }
          }
          agent { label 'mesos-qa-uswest2' }
          options {
            timeout(time: 5, unit: 'MINUTES')
          }
          steps {
            retry(4) {
              script {
                def deploy = new com.opentable.sous.Deploy()
                  deploy.execute()
              }
            }
          }
          environment {
            SOUS_CLUSTER = "pp-uswest2"
          }
          post {
            success {
              githubNotify context: 'Jenkins/Deploy/PP-USWEST2', description: 'Deploy to PP-USWEST2', status: 'SUCCESS'
            }
            failure {
              githubNotify context: 'Jenkins/Deploy/PP-USWEST2', description: 'Deploy to PP-USWEST2', status: 'FAILURE'
            }
          }
        }
        stage('Deploy rcpp-sf') {
          when{
            expression { params.SOUS_DEPLOY_PP == 'YES' }
            expression { params.SOUS_USE_RC == 'YES' }
          }
          agent { label 'mesos-qa-uswest2' }
          options {
            timeout(time: 5, unit: 'MINUTES')
          }
          steps {
            retry(4) {
              script {
                def deploy = new com.opentable.sous.Deploy()
                  deploy.execute()
              }
            }
          }
          environment {
            SOUS_CLUSTER = "rcpp-sf"
          }
          post {
            success {
              githubNotify context: 'Jenkins/Deploy/RCPP-SF', description: 'Deploy to RCPP-SF', status: 'SUCCESS'
            }
            failure {
              githubNotify context: 'Jenkins/Deploy/RCPP-SF', description: 'Deploy to RCPP-SF', status: 'FAILURE'
            }
          }
        }
	  }
	}
        stage('Test Post PP') {
          when{
            expression { params.SOUS_POST_PP_TEST == 'YES' }
			branch 'master'
          }
          agent { label 'mesos-qa-uswest2' }
          steps {
            withEnv(["CMD_TO_EXECUTE=${params.SOUS_POST_PP_TEST_COMMAND}"]) {
              script {
                def executecmd = new com.opentable.sous.ExecuteCmd()
                executecmd.execute()
              }
            }
          }
          post {
            success {
              githubNotify context: 'Jenkins/Test/Post/PP', description: 'Post PP Tests Passed', status: 'SUCCESS'
            }
            failure {
              githubNotify context: 'Jenkins/Test/Post/PP', description: 'Post PP Tests Failed', status: 'FAILURE'
            }
          }
        }
	  stage('Input Prod Deployment') {
      when{
        branch 'master'
        expression { params.SOUS_DEPLOY_PROD_QUERY_USER == 'YES' }
      }
      steps {
        script {
        	env.DEPLOY_TO_PROD = input message: 'User input required',
          parameters: [choice(name: 'Deploy to Prod?', choices: 'no\nyes', description: 'Choose "yes" if you want to deploy this build to production.')]
        }
      }
		}
    stage('master branch deploy PROD'){
      when{
        branch 'master'
        expression { params.SOUS_DEPLOY_PROD == 'YES' }
      }
      parallel {
		stage('Deploy rcprod-sc') {
          when{
            expression { params.SOUS_DEPLOY_PROD == 'YES' }
            expression { params.SOUS_USE_RC == 'YES' }
          }
          agent { label 'mesos-qa-uswest2' }
          options {
            timeout(time: 5, unit: 'MINUTES')
          }
          steps {
            retry(4) {
              script {
                def deploy = new com.opentable.sous.Deploy()
                  deploy.execute()
              }
            }
          }
          environment {
            SOUS_CLUSTER = "rcprod-sc"
          }
          post {
            success {
              githubNotify context: 'Jenkins/Deploy/RCPROD-SC', description: 'Deploy to RCPROD-SC', status: 'SUCCESS'
            }
            failure {
              githubNotify context: 'Jenkins/Deploy/RCPROD-SC', description: 'Deploy to RCPROD-SC', status: 'FAILURE'
            }
          }
        }
        stage('Deploy prod-sc') {
          when{
            expression { params.SOUS_DEPLOY_PROD == 'YES' }
          }
          agent { label 'mesos-qa-uswest2' }
          options {
            timeout(time: 5, unit: 'MINUTES')
          }
          steps {
            retry(4) {
              script {
                def deploy = new com.opentable.sous.Deploy()
                  deploy.execute()
              }
            }
          }
          environment {
            SOUS_CLUSTER = "prod-sc"
          }
          post {
            success {
              githubNotify context: 'Jenkins/Deploy/PROD-SC', description: 'Deploy to PROD-SC', status: 'SUCCESS'
            }
            failure {
              githubNotify context: 'Jenkins/Deploy/PROD-SC', description: 'Deploy to PROD-SC', status: 'FAILURE'
            }
          }
        }
        stage('Deploy prod-ln') {
          when{
            expression { params.SOUS_DEPLOY_PROD == 'YES' }
          }
          agent { label 'mesos-qa-uswest2' }
          options {
            timeout(time: 5, unit: 'MINUTES')
          }
          steps {
            retry(4) {
              script {
                def deploy = new com.opentable.sous.Deploy()
                  deploy.execute()
              }
            }
          }
          environment {
            SOUS_CLUSTER = "prod-ln"
          }
          post {
            success {
              githubNotify context: 'Jenkins/Deploy/PROD-LN', description: 'Deploy to PROD-LN', status: 'SUCCESS'
            }
            failure {
              githubNotify context: 'Jenkins/Deploy/PROD-LN', description: 'Deploy to PROD-LN', status: 'FAILURE'
            }
          }
        }
        stage('Deploy prod-uswest2') {
          when{
            expression { params.SOUS_DEPLOY_PROD == 'YES' }
          }
          agent { label 'mesos-qa-uswest2' }
          options {
            timeout(time: 5, unit: 'MINUTES')
          }
          steps {
            retry(4) {
              script {
                def deploy = new com.opentable.sous.Deploy()
                  deploy.execute()
              }
            }
          }
          environment {
            SOUS_CLUSTER = "prod-uswest2"
          }
          post {
            success {
              githubNotify context: 'Jenkins/Deploy/PROD-USWEST2', description: 'Deploy to PROD-USWEST2', status: 'SUCCESS'
            }
            failure {
              githubNotify context: 'Jenkins/Deploy/PROD-USWEST2', description: 'Deploy to PROD-USWEST2', status: 'FAILURE'
            }
          }
        }
	  }
	}
        stage('Test Post Prod') {
          when{
            expression { params.SOUS_POST_PROD_TEST == 'YES' }
			branch 'master'
          }
          agent { label 'mesos-qa-uswest2' }
          steps {
            withEnv(["CMD_TO_EXECUTE=${params.SOUS_POST_PROD_TEST_COMMAND}"]) {
              script {
                def executecmd = new com.opentable.sous.ExecuteCmd()
                executecmd.execute()
              }
            }
          }
          post {
            success {
              githubNotify context: 'Jenkins/Test/Post/PROD', description: 'Post Prod Tests Passed', status: 'SUCCESS'
            }
            failure {
              githubNotify context: 'Jenkins/Test/Post/PROD', description: 'Post Prod Tests Failed', status: 'FAILURE'
            }
          }
        }
  }
  post {
    always {
      echo 'This will always run'

        script {
          def notifier = new org.gradiant.jenkins.slack.SlackNotifier()

            env.SLACK_CHANNEL = '#team-eng-sous-bots, #tech-deploy'
            env.CHANGE_LIST = 'true'
            env.NOTIFY_SUCCESS = 'true'

            notifier.notifyResult()
        }

      //slackSend color: 'good', message: 'Message from Jenkins Pipeline'
      //script {
      //  def slack = new com.opentable.sous.Slack()
      //  slack.call(currentBuild.currentResult, '#team-eng-sous-bots')
      //}
    }
    success {
      echo 'This will run only if successful'
        githubNotify context: 'Jenkins Overall Success', description: 'PIPELINE all Passed!!!', status: 'SUCCESS'
    }
    failure {
      echo 'This will run only if failed'
        githubNotify context: 'Jenkins Overall Success', description: 'PIPELINE FAILED', status: 'FAILURE'
    }
    unstable {
      echo 'This will run only if the run was marked as unstable'
    }
    changed {
      echo 'This will run only if the state of the Pipeline has changed'
        echo 'For example, if the Pipeline was previously failing but is now successful'
    }
  }
}
