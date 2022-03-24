pipeline { 
    agent any  
    stages { 
        stage('Stage1: Check Java Version') { 
            steps { 
               echo 'This is my first simple pipeline example. Stage1' 
			   bat 'java -version'
            }
        }
		 stage('Stage2: Check Maven veresion') { 
            steps { 
               echo 'This is my first simple pipeline example. Stage2' 
			   bat 'mvn -version'
            }
        }
    }
}