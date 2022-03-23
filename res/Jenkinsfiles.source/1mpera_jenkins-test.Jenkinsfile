pipeline {
	agent any
	options {
		buildDiscarder(logRotator(numToKeepStr: '5'))
	}
	parameters {
		string(name: 'IMAGE_REPO_NAME', defaultValue: 'jamessmith52963/basic-react', description: '')
		string(name: 'LATEST_BUILD_TAG', defaultValue: 'build-latest', description: '')
		string(name: 'DOCKER_COMPOSE_FILENAME', defaultValue: 'docker-compose.yml', description: '')
		string(name: 'DOCKER_STACK_NAME', defaultValue: 'react_stack', description: '')
		booleanParam(name: 'NPM_RUN_TEST', defaultValue: true, description: '')
		booleanParam(name: 'PUSH_DOCKER_IMAGES', defaultValue: true, description: '')
		booleanParam(name: 'DOCKER_STACK_RM', defaultValue: false, description: 'Remove previous stack.  This is required if you have updated any secrets or configs as these cannot be updated. ')
	}
	stages {
		stage('npm install') {
			agent {
				docker {
					image 'node:latest'
					customWorkspace "$JENKINS_HOME/workspace/$BUILD_TAG"
				}
			}
			steps {
				sh "pwd && whoami"
				sh "npm install"
			}
		}
		stage('npm test') {
			agent {
				docker {
					image 'node:latest'
					customWorkspace "$JENKINS_HOME/workspace/$BUILD_TAG"
				}
			}
			steps {
				sh "pwd"
				sh "npm test"
			}
      post {
        always {
          sh "whoami"
          sh 'echo "This will always run"'
          slackSend channel: "#python-priv", color: 'good', message: 'Message from Jenkins Pipeline'
        }
            success {
              sh 'This will run only if successful'
            }
            failure {
              sh 'This will run only if failed'
            }

      }
		}

	}

}
