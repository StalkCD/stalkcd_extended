pipeline {
  agent any
stage('Configure') {
    env.PATH = "${tool 'maven-3.0.5'}/bin:${env.PATH}"
  }
    stages {
        stage('Checkout') {
            steps {
                echo 'Checkout'
            }
        }
        stage('Build') {
            steps {
                echo 'Clean Build'
		//tool name: 'maven-3.0.5', type: 'maven'
                sh 'mvn clean install'
            }
		post {
        always {
            archive "target/**/*"
            junit 'target/surefire-reports/*.xml'
	    jacoco(execPattern: 'target/jacoco.exec')
	    }
    }
        }
	    

        stage('SonarQube analysis') {
            steps {
                echo 'Sonar Scanner'
              // 	def scannerHome = tool 'sonar-scanner-3.0.3'
			                withSonarQubeEnv('SonarQube') {
                    sh 'C:/sonar-scanner-3.0.3/bin/sonar-scanner'
			    }
            }
        }
	   	    
	    
      
        stage('Deploy') {
            steps {
                echo '## TODO DEPLOYMENT ##'
            }
        }
    }
    
    post {
        always {
            echo 'JENKINS PIPELINE'
        }
        success {
            echo 'JENKINS PIPELINE SUCCESSFUL'
        }
        failure {
            echo 'JENKINS PIPELINE FAILED'
        }
        unstable {
            echo 'JENKINS PIPELINE WAS MARKED AS UNSTABLE'
        }
        changed {
            echo 'JENKINS PIPELINE STATUS HAS CHANGED SINCE LAST EXECUTION'
        }
    }
}
