#!groovy
pipeline {

	agent any
//	agent {
//	    label 'linux'
//	}

	
	options {
    	skipDefaultCheckout true
    	
	}
	
    stages {		
		stage('Clone'){	
		    steps{
		        git 'https://github.com/beserb/HelloWorldCPP.git'
		        echo 'Clone step is completed.'        
		    }
		}
		
		stage('Build'){	
		    steps {
        		sleep 0
	            echo 'Build step is completed.'
	            //error 'Build failed!'

//                script {
//                    currentBuild.result = 'FAILURE'
//                }   
            }
		}
		
		stage('Parallel Stages'){
//			when {
//			    expression {
//                       currentBuild.result == 'SUCCESS'
//			      }			        
//            }
                      
		    parallel {
	            stage('SCA') {
			        steps {
		        		sleep 5
			            echo 'SCA stage is completed.'
		            }
	        	}
	        	
				stage('Format Checker') {
			        steps {
		        		sleep 3
			            echo 'Format checker stage is completed.'
		            }
	        	}
	        }
		}	
	}
	
	post{
	    always{
	        echo 'Post(always) is executed'
	        archiveArtifacts artifacts: 'src/*.exe', onlyIfSuccessful: true
	        
//	        //txt emailext config
//	        emailext to: 'burakbeser@gmail.com',
//	        		 subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}",
//	        		 body: "Status: ${currentBuild.currentResult}\n Job name: ${env.JOB_NAME}\n Build number: ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}"
			
//			//html emailext config
//			emailext body: 'Status: $build.result <br> Job name: $JOB_NAME <br> Build number: $BUILD_NUMBER <br> More info at: $BUILD_URL ', 
//			subject: '$DEFAULT_SUBJECT ', 
//			to: 'burakbeser@gmail.com'                

			emailext attachLog: true,
					 body: '''${SCRIPT, template="mymail.groovy"}''',
		             subject: '$DEFAULT_SUBJECT ',
		             to: 'burakbeser@gmail.com'
        }
        
	    success {
		    echo 'Post(success) is executed'
		}
		
		failure {
	        echo 'Post(failure) is executed'
	        //emailext body: 'Jenkins pipeline failed!', subject: 'Pipeline Failed!!!', to: 'burakbeser@gmail.com'
	    }
	    unstable {
		    echo 'Post(unstable) is executed'
		}
		changed {
	        echo 'Post(changed) is executed'
	    }
	}
	
}
