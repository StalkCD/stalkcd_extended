pipeline {
    agent any
    stages {
        stage('Compile Stage') {
		steps {
			withMaven(maven: "maven_3.0.5"){
				 sh "mvn clean compile --file /var/lib/jenkins/workspace/pipeline-test/demo/pom.xml"
			}
            }
        }
        stage('Code Quality Analysis Stage') {
		steps {
			withMaven(maven: "maven_3.0.5"){
				 sh "mvn sonar:sonar --file /var/lib/jenkins/workspace/pipeline-test/demo/pom.xml"
			}
            }
        }
        stage('WAR Generation Stage') {
            steps {
		    withMaven(maven: "maven_3.0.5"){
		        sh "mvn package --file /var/lib/jenkins/workspace/pipeline-test/demo/pom.xml"
		    }
            }
        }
    }
}
