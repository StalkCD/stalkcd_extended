pipeline {

	agent none

	options {
		timestamps()
		buildDiscarder(logRotator(numToKeepStr:'5')) //delete old builds
	}

	environment {
		DOCKERHUB = credentials('emcconne-dockerhub')
		DOCKER_CONTAINER_NAME = "hello-${JOB_NAME}-${BUILD_NUMBER}".replaceAll('/','-')
		IMAGE_NAME = "emcconne/hello-rest-server"
		IMAGE_TAG = "latest"
		DOCKER_NETWORK = "cje-${JOB_NAME}-${BUILD_NUMBER}".replaceAll('/','-')
	}

	stages {
		
		stage('Build, Unit, Package') {
			agent {
				docker {
					label "docker"
					image "maven"
				}
			}
			steps {
				sh "echo $JOB_NAME"
				sh 'mvn clean package verify'
				junit testResults: '**/target/surefire-reports/TEST-*.xml'
				archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true

			}
		}

		stage('Create Docker Image') {
			agent {
				docker {
					label "docker"
					image "docker"
					args '-v /var/run/docker.sock:/var/run/docker.sock -u 0:0'
				}
				
			}
			steps {
				sh "docker build -t $IMAGE_NAME:$IMAGE_TAG ."
			}
		}
		

		stage('Quality Analysis') {
			parallel {
				stage ("Quality Analysis") {
					agent {
						docker {
							label "docker"
							image "maven"
						}
					}
					steps {
						sh 'mvn test'
						//step([$class: 'CheckStylePublisher'])
						//step([$class: 'FindBugsPublisher'])
						//step([$class: 'PmdPublisher'])
					}
				}
				stage ("Functional Test") {
					agent {
						docker {
							label "docker"
							image "docker"
							args '-v /var/run/docker.sock:/var/run/docker.sock -u 0:0'
						}
					}
					steps {
						script {
							//Find some random port in the private port range and use that for our tests
							DOCKER_PORT = sh (script: "echo \$(((RANDOM%16383 + 49152)))", returnStdout: true).trim()
						}
						//fire up the app
						sh """
							docker network create $DOCKER_NETWORK
							docker run -d --name $DOCKER_CONTAINER_NAME \
								--network $DOCKER_NETWORK \
								-p $DOCKER_PORT:4567 \
								--hostname $DOCKER_CONTAINER_NAME \
								$IMAGE_NAME:$IMAGE_TAG

						"""
						//hit the /hello endpoint and collect result
						retry(3) {
							sleep 3
							script {
							    	docker.image("appropriate/curl").inside("--net=$DOCKER_NETWORK") {
							       		sh 'curl -v http://$DOCKER_CONTAINER_NAME:4567/hello'
										RET_VAL = sh (
	                     					script: "curl -v http://$DOCKER_CONTAINER_NAME:4567/hello", returnStdout:  true
	                 					).trim()
							    	}
							}
						}
						//store result in archive
						sh "echo $RET_VAL > functionalTest.txt"
						archiveArtifacts artifacts: 'functionalTest.txt', fingerprint: true
					}
				}
			}
		}

		stage('Push Docker Image') {
			agent {
				docker {
					label "docker"
					image "docker"
					args '-v /var/run/docker.sock:/var/run/docker.sock -u 0:0'
				}
			}
			when {
				branch 'master'
			}
			steps {
				sh """
					docker login -u $DOCKERHUB_USR -p $DOCKERHUB_PSW
					docker push $IMAGE_NAME:$IMAGE_TAG
				"""
			}
		}
		
		stage('XL Release Deployment') {
			agent none
			when {
				branch 'master'
			}
      steps {

				echo "Calling Xebia Labs for deployment of Docker container"

				sleep 10
			}
		}
	}

	post {
		always {
			node('docker') {
				sh """
					docker stop \$(docker ps -a | $DOCKER_CONTAINER_NAME | awk '{print \$1}') || true
					docker rm -fv $DOCKER_CONTAINER_NAME || true
					docker network rm $DOCKER_NETWORK || true
					docker ps -a

				"""
			}
		}
		success { 
			emailext (
			  	to: "bmcconnell@cloudbees.com",
			  	subject: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
			  	body: """SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':
			    	Check console output at '${env.BUILD_URL}'/${env.JOB_NAME} [${env.BUILD_NUMBER}]""",
			  	recipientProviders: [[$class: 'DevelopersRecipientProvider']]
			)
		}
		failure {
            		mail to: 'bmcconnell@cloudbees.com', subject: 'The Pipeline failed to build :(', body: 'Pipeline failed'
		}
	}
}
