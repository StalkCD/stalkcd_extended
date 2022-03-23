pipeline {
    agent any

    stages {
        stage ('Compile Stage') {

            steps {
                withMaven(maven : 'maven_3_5_0') {
                    sh 'mvn -f jenkins-maven-pipeline/pom.xml clean compile'
                }
            }
        }
        stage ('Testing Stage') {

            steps {
                withMaven(maven : 'maven_3_5_0') {
                    sh 'mvn -f jenkins-maven-pipeline/pom.xml test'
                }
            }
        }
        stage ('Deployment Stage') {
            steps {
                withMaven(maven : 'maven_3_5_0') {
                    sh 'mvn -f jenkins-maven-pipeline/pom.xml deploy'
                }
            }
        }
        stage ('War Compile Stage') {
            steps {
                withMaven(maven : 'maven_3_5_0') {
                    sh 'mvn -f war-sample/pom.xml clean deploy'
                }
            }
		}
		stage ('War Deployment Stage') {
            steps {
                withMaven(maven : 'maven_3_5_0') {
                    sh ' exit 0 ; mvn -f war-sample/pom.xml tomcat7:deploy'
                }
            }
		}
	}
}