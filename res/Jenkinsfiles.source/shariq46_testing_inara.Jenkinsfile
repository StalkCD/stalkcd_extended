pipeline {
    agent none 
    stages {
        stage('Build') { 
            steps {
                sh 'python -version' 
            }
        }
    }
}
pipeline {
    agent any 
    stages {
        stage('Build') { 
            steps {
                sh 'ls' 
            }
        }
	 stage('checking') {
            steps {
                sh 'ls -a'
            }
        }
    }
}

