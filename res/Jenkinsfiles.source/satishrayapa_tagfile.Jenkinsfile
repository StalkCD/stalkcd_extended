/**
  * Jenkins Declarative Pipeline
  * 
  *
  * In this Jenkinsfile, We are writing CES job tagging
**/


pipeline {
// =========================================================================================
//            USER PARAMETERS FOR AGENT,CREDENTIALS,TAG NUMBER
//==========================================================================================
    parameters {
        credentials(name: 'CredsToUse', description: 'A user to build with', defaultValue: '', credentialType: "Username with password", required: true )
        string(name: 'tag_var', defaultValue: '1', description: '') 
        string(name: 'slave', defaultValue: 'master', description: '')
            }
//===========================================================================================
//              SELECT THE AGENT WHERE TO RUN THE JOB
//===========================================================================================
    agent { label "${params.slave}" }
// =======================================================================
// BUILD SCHEDULE: DAILY 
// =======================================================================	


//===========================================================================================
//               CLEAN THE WORKSPACE BEFORE BUILD
//========================================================================================== 
    stages {
         stage ('clean workspace') {
             steps {
                cleanWs()
				
			 }
	     }
//===========================================================================================
//               CHECKOUT THE CODE 
//========================================================================================== 
			 
		 stage ('checkout the code') {
		      steps {
			     git branch: 'grails3_migration', credentialsId: "${params.CredsToUse}", url: 'https://bitbucket.org/tsmojo/cloud-environment-simulator/src/grails3_migration/'
	          }
         }			  
		
//===========================================================================================
//               CREATE TAGS & PUSH TAGS IN TO BITBUCKET
//========================================================================================== 			
		 stage ('create tags and push') {
		      steps {
                   bat '''git tag -a v1.%tag_var% -m "my version 1.%tag_var%"
				       git push https://sagarshah_mobiliya@bitbucket.org/tsmojo/cloud-environment-simulator.git v1.%tag_var% '''
              }
         }
    }

		
    
}
