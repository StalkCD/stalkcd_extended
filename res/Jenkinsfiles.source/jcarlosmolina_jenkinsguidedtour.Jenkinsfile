pipeline {
    agent { docker { image 'maven:3.3.9' } }
    stages {
        stage('build') {
            steps {
                sh 'mvn --version'
            }
        }
    }
    post {
	always {
	    echo 'This will always run'
	}
        success {
	    echo 'This will only run if successful'
	}
	failure {
	    echo 'This will only run if failed'
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