pipeline {
    agent any 
    stages {
        stage('job1_pipeline') { 
            steps {
		    	build job: 'job1_pipeline', parameters: []
            }
        }
        stage('job2_pipeline') { 
            steps { 
		    	build job: 'job2_pipeline', parameters: []
            }
        }
    }
}