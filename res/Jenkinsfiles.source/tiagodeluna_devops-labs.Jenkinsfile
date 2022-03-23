pipeline {
	agent any

	environment {
		AUTHOR = "Tiago Luna"
	}

	stages {
		stage("Test") {
			steps {
				build "Hello App Test Run"
			}
		    post {
		        failure {
		            mail to: 'tiagodeluna@hotmail.com', subject: 'The Pipeline failed :(',
		             body: "Failure executing build ${currentBuild.displayName} of Project ${env.JOB_NAME}",
		             bcc: '', cc: '', charset: 'UTF-8', from: '', mimeType: 'text/html', replyTo: '';
		        }
		    }
		}
		stage("Secondary"){
			steps {
				build "Secondary Job"
			}
		}
		stage("Finish"){
			steps {
				echo "Pipeline finished executing build ${currentBuild.displayName} by ${env.AUTHOR}"
			}
		}	
	}
}
