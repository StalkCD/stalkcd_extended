pipeline {
    agent { docker 'php' }
    stages {
    	stage('test') {
            steps {
                sh 'echo "Hello World"'
                sh '''
                	echo "Multiline shell steps works too"
                	ls -lah
                '''	
            }
        }
        stage('build') {
            steps {
                sh 'php --version'
            }
        }
    }
    post {
    	always {
    		echo 'This will always run'
    	}
    	success {
    		echo 'This will run when all passed'
    	}
    	unstable {
    		echo 'This will run if the thing are unstable'
    	}
    	changed {
    		echo 'This will run only if the state of the pipeline has changed'
    		echo 'For example, if the pipeline was previously failing but is now succesful'
    	}
    }
}