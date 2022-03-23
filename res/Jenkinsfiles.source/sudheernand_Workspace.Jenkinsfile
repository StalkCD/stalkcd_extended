pipeline {
    agent any

    stages {
        stage ('Compile Stage') {

            steps {
                withMaven(maven : 'maven_3_6_0') {
                    bat 'mvn -f ./JenkinsPipelineTest/pom.xml clean compile'
                   
                }
            }
        }

        stage ('Testing Stage') {

            steps {
                withMaven(maven : 'maven_3_6_0') {
                    bat 'mvn -f ./JenkinsPipelineTest/pom.xml test'
                }
            }
        }
        stage ('Deployment Stage') {
            steps {
                withMaven(maven : 'maven_3_6_0') {
                    bat 'mvn -f ./JenkinsPipelineTest/pom.xml deploy'
                }
            }
        }
    }
}