pipeline {
	agent any
		stages {
			stage('one') {
				steps{
					echo 'Hi, This is terry from Jenkins Pipeline!'
				}
			}
			stage('two') {
				steps{
					input('Do you want to proceed?')
				}
			}
			stage('three') {
				when {
					not {
						branch "master"
					}
				}
				steps {
					echo "Hello"
				}
			}
			stage('four')
			{
				parallel {
					stage('Unit test') {
						steps{
							echo "Running the unit test...."
						}

					}
					stage('Integration test'){
						agent{
							docker {
								reuseNode false
								image 'ubuntu'
							}
						}
						steps{
							echo 'Running the integration test....'
						}
					}
				}
			
			}
		}
}
