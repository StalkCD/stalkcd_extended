//Jenkinsfile (Declarative Pipeline)
// Use scripted Jenkins pipeline 
pipeline {
    agent { 
		dockerfile {
			dir '/var/lib/jenkins/workspace/tryDock-jenkins'
			//additionalBuildArgs '--build-arg foo=bar'
		} 
    }

    stages {
        stage('build') {
            steps {
                sh 'python --version'
                sh 'ls -lah'
            }
        }

	stage('Deploy') {
            when {
				expression {
					currentBuild.result == null || currentBuild.result == 'SUCCESS' 
				}
            }
            steps {
                //sh 'make publish'
				echo "RESULT: ${currentBuild.result}"
            }	
        }
    }
}
