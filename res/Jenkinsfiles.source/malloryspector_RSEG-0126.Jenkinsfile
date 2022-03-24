pipeline {
    agent any

    stages {
    	stage('Clean') {
    		steps {
    			withAnt(installation: 'AntPipeline') {
	        		echo 'Cleaning..'
	        		sh 'ant clean'
	        	}	
            }
    	}
        stage('Build') {
        	 steps {
	        	withAnt(installation: 'AntPipeline') {
	        		echo 'Compiling..'
	        		sh 'ant compile'
	            }
        	}
        }
        stage('Test') {
            steps {
            	withAnt(installation: 'AntPipeline') {
	        		echo 'Test..'
	        		sh 'ant run'
	        	}	
            }
        }
    }
}