pipeline {

	environment {
    registry = "kbhagtan3/pipeline"
	}
	
    agent any

    stages {
	     stage ('Clone Stage'){
             steps{
                 git "https://github.com/kbhagtan/ShoppingRetailService.git"
             }
         }

        stage ('Package Stage') {

            steps {
                withMaven(maven : 'Maven6') {
                    sh "mvn clean install -Dmaven.test.skip=true"
                }
            }
        }
        
		stage('Building Docker Image') {
			steps{
			script {
			def dockerImage =  docker.build registry + ":$BUILD_NUMBER"
			}	
      }
    }
	
	 stage ('Run Stage')
	 {
		steps{
		sh "docker run -dp 8006:8006 kbhagtan3/pipeline:${env.BUILD_ID}"	
	 }
	
    }
  }
  }