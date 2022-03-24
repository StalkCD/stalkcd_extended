pipeline{
	agent any
	stages{
		stage('clean'){
		steps{
			sh "mvn -f HelloWorld_Maven_Pipeline clean"
		}
		}
		stage('compile'){ 
		steps{
			sh "mvn -f HelloWorld_Maven_Pipeline compile"
		}
		}
		stage('package'){
		steps{
			sh "mvn -f HelloWorld_Maven_Pipeline package"
		}
		}
		stage('run'){
		steps{
			sh "mvn -f HelloWorld_Maven_Pipeline exec:java"
		}
		}

	}
	post{
    	success{
    		echo "****This is Post Section****"
    		echo "-----The Build is Successful-----"
    	}
    }
	
	
}
