pipeline {
	agent { none }
	stages {
		stage('Run slave') {
			agent { label 'master' }
			steps {
				sh './start_slave agent.php.n01 ff6a1c1eb7b38332154d296639e20973751fa630c0a4a683a68544dd223d9598'
			}
		}
		stage('Build') {
			agent { label 'agent.php.n01' }
			steps {
				echo 'Hello world'
			}
		}
	}
}
