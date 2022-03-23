pipeline {
	agent {
		dockerfile true
	}
	stages {
		stage ('Test') {
			steps {
				sh '''
					python test_docker.py
				'''
			}
		}
	}
	post {
		always {
			//junit 'build/reports/**/*.xml'
			echo 'Reached end of pipeline!'
		}
		success {
			echo 'This will run only if successful'
		}
		failure {
			echo 'This will run only if failed'
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
