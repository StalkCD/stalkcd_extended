pipeline {
    
	agent any
    
	environment {
        CI = 'true'
    }
    
	stages {
        stage('code') {
			//for more details check https://jenkins.io/doc/book/pipeline/syntax/#built-in-conditions
			//Assuming Tester don't want frequent builds
			when {
				not {
					branch 'testing'
				}			
            }
            steps {
				//example to print variables
				sh "echo ${CI}"
				echo CI
				
				//Build your code
				//Run your Unit Tests if you are TDD guy
				//Add steps to checkin to Main Branch
				//Add Steps to bundle
				sh "cd HiddenMessage/ ; sh build.sh"
				
				//Add steps to copy the latest file 
				sh "scp HiddenMessage/output/hiddenmessages.tar ftpuser@164.99.111.116:/home/ftpuser/latest/"
	        }
        }
	
		stage('Deploy') {
		    //agent { docker 'YOUR TEST DOCKER NAME' } ensure global agent is none to leverage this
			//Assuming Developer don't worry about Deployments
     		when {
				not {
					branch 'production'
				}
            }
			
            steps {
                sh "echo $pwd"
				//Add steps to bundle
				//Run Your Tests
				sh "mkdir -p ~/testdir; cd  ~/testdir "
				sh "scp ftpuser@164.99.111.116:/home/ftpuser/latest/hiddenmessages.tar ./"
				sh "tar -xvf hiddenmessages.tar"
    	
			}
        }
        
		stage('Test') {
			//agent { docker 'YOUR TEST DOCKER NAME' } ensure global agent is none to leverage this
			//Assuming Developer don't worry about Deployments
     		when {
				not {
					branch 'production'
				}
            }
	        steps {
                sh "echo $pwd"
				sh "cd ${WORKSPACE}/HiddenMessage/ ; sh test.sh"
				sh "ls -lrt "
	        }
        }
    }
}