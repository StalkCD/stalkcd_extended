pipeline {
		agent any
		stages {
			stage('One') {
				steps {
					echo "This is Declerative Pipeline"
				}
			}
			stage('Two') {
				steps {
					input('Do you want to proceed?')
				}
			}
			stage('Three') {
				when {
					not {
						branch "master"
					}
				}
				steps {
					echo "Helloo!!"
				}
			}
			stage('Four') {
				parallel {
					stage('Unit Test') {
						steps {
							echo "Running the Unit Test"
						}
					}
					stage('Integration Test') {
						agent {
							docker {
								reuseNode false
								image 'ubuntu'
							}
						}
						steps {
							echo "Running the Integration Test"
						}
					}
				}
			}
		}
        }
