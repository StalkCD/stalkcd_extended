pipeline {
    agent any

    stages {
    
        stage('Initialize') {
            steps {          	
				sh "gradle init"
                echo "The pipeline stage Initialized successfully."
            }
        }


     	stage('Functional Tests') {
	        steps {
	            sauce('923fc3a2-50d8-48b1-b8a1-adba6a7b72fe') {
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