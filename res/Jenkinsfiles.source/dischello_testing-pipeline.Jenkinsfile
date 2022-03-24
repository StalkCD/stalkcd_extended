@Library('hybris-geuk@v1.6') _ // Load Required libraries from Shared Pipeline Library

pipeline {
    agent any
    options {
        skipDefaultCheckout() // Disable SCM checkout running for every stage
        disableConcurrentBuilds() // Disable concurent builds
        buildDiscarder(logRotator(numToKeepStr:'5'))
    }
    stages{
        stage('Dummy'){
	    agent {label 'master'}
            steps{
		   // build job: 'test_pipeline_checkout_and_github_poll', parameters: [string(name: 'BRANCH', value: "${scm.branches[0].name}")]
		    //dir('/var/lib/jenkins/workspace/test_pipeline_checkout_and_github_poll'){
			    //git branch: "${scm.branches[0].name}", credentialsId: 'PASS_GitHub', url: 'https://github.com/dischello/testing-pipeline' 
			    //sh "git checkout ${scm.branches[0].name}"
			    //sh "git pull"
			    sh 'git rev-parse --short HEAD'
			    //stash includes: '**/*', name: 'Git_Revision'
		    //}
		//unstash 'Git_Revision'
            }
        }
    }
    post {
      success {
          echo "Success"
            //env.HYBRIS_TESTS="SoapUI,QA_API_Tests"
    		//sendSlackNotification type: 'build-succeed'
    	}
    	unstable {
            echo "Unstable"
            //env.HYBRIS_TESTS="SoapUI,QA_API_Tests"
    		//sendSlackNotification type: 'build-unstable'
    	}
    	failure {
            echo "Failed"
            //env.HYBRIS_TESTS="SoapUI,QA_API_Tests"
    		//sendSlackNotification type: 'build-failed'
    	}
    	aborted {
            echo "Aborted"
            //env.HYBRIS_TESTS="SoapUI,QA_API_Tests"
    		//sendSlackNotification type: 'build-aborted'
    	}
    }
}
