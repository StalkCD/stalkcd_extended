// requires you to define the library as a global shared library https://jenkins.io/doc/book/pipeline/shared-libraries/#global-shared-libraries
// https://github.com/rkivisto/pipeline-library-demo
@Library('pipeline-library-demo@master') _

// to import dynamically: https://jenkins.io/doc/book/pipeline/shared-libraries/#dynamic-retrieval
// library identifier: 'pipeline-library-demo@master', retriever: modernSCM(
//  [$class: 'GitSCMSource',
//   remote: 'git@github.com:rkivisto/pipeline-library-demo.git',
//   credentialsId: 'my-key'])

pipeline {
	agent none
	stages {
		stage('get build cause') {
			agent any
			steps {
				// getBuildCause() is from pipeline-library-demo
				echo getBuildCause()
			}
		}
	}
}
