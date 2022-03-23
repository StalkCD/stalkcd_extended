pipeline {
    agent none
    stages {
        stage('Non-Parallel Stage') {
			agent {
				label "slave1"
			}
            steps {
                echo 'This stage will be executed first.'
            }
        }
		stage('Test') { 
			agent {
				label "slave1"
			}
			steps {
                echo 'This stage will be executed 2th.'
            }	
		}
        stage('Parallel Stage') {
            parallel {
                stage('build1') {
				agent {
                        label "master"
                    }
                    steps {
                        echo "On Branch A"
						
                    }
                }
                stage('build2') {
                    agent {
                        label "master"
                    }
                    steps {
                        echo "On Branch B"
						
                    }
                }
				stage('build3') {
                    agent {
                        label "master"
                    }
                    steps {
                        echo "On Branch B"
						
                    }
                }
            }
        }
    }
}
