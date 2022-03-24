pipeline {

    agent any

    environment {
  		PASS = credentials('registry-pass')
    }

    stages {

        stage('Build') {
            steps {
                sh '''
			         withBash/pipeline/jenkins/build/mvn.sh mvn -B -DskipTests clean package
			         withBash/pipeline/jenkins/build/build.sh
                '''   
            }
            post {
                success {
                    archiveArtifacts artifacts: 'withBash/pipeline/java-app/target/*.jar', fingerprint: true
                }
            }
        }
        stage('Test') {
            steps {
		        sh 'withBash/pipeline/jenkins/test/test.sh mvn test' 
            }
            post {
                always {
                    junit 'withBash/pipeline/java-app/target/surefire-reports/*.xml'
                }
	        }
        }
        stage('Push') {
            steps {
		       sh 'withBash/pipeline/jenkins/push/push.sh'
            }
        }
        stage('Deploy') {
            steps {
       		   sh 'withBash/pipeline/jenkins/deploy/deploy.sh'
            }
        }
    }
}
