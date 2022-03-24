
pipeline {
    
	agent none
  
	// pipeline must complete in 10 minutes
	options {
		timeout(time: 10, unit: 'MINUTES') 
		buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '5'))
	}

	stages {
    	
		stage ('build') {	          
			agent {
				label 'ubuntu'
			}
			steps {	    
				sh 'mvn verify'
				junit 'target/surefire-reports/TEST-hhtay.AppTest.xml'
			}
			post {
				always {
					archiveArtifacts artifacts: 'target/*.jar', fingerprint: true 
				}
			}
		}
		
		stage('analysis') {
			agent {
				label 'ubuntu'
			}
			steps {
				script {
					SCANNER_HOME = tool 'sonarscanner';	
				}
				withSonarQubeEnv('sonarserver') {
					sh "${SCANNER_HOME}/bin/sonar-scanner"
				}	
			}
		}
	}
	
}





