pipeline {
    agent any

    stages {
    
        stage('Initialize') {
            steps {          	
				sh "./gradlew build"				
				//sh "gradle init"
                echo "The pipeline stage Initialized successfully."
            }
        }


     	stage('Functional Tests') {
	        steps {
	            sauce('d6f73c92-2ba1-438c-acd9-88f47268793e') {
						sh "./gradlew clean test"
						//step([$class: 'SauceOnDemandTestPublisher'])    
		            	echo "The pipeline stage Functional Tests completed successfully."                    
	            	   
	            }
	        }
        }


        stage('Sauce Reporting') {
            steps {
                echo "The pipeline stage Reporting completed successfully."
                step([$class: 'SauceOnDemandTestPublisher'])
                saucePublisher()
            }
        }

        stage('Clean') {
            steps {
                echo "The pipeline stage Clean completed successfully."
            }
        }
        


    }
    
}