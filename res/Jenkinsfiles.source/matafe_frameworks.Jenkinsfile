pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'mvn clean -DskipTests install'
            }
        }
        stage('Unit Tests') {
            steps {
                sh 'mvn test'
            }
        }
        stage('Deploy') {
            steps {
            	sh 'echo "Deploying the app"'
            }
        }        
    }
	post {
	    always {
	        echo 'Pipeline execution finished!'
	    }
	    success {
	        echo 'Pipeline execution finished successful!'
	    }
	    failure {
	        echo 'Pipeline execution failed!'
	    }
	    unstable {
	        echo 'Pipeline execution is unstable!'
	    }
	    changed {
	    }
	}    
}