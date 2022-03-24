pipeline {
    agent any
    stages {

         stage('build && SonarQube analysis') {
            steps {
                withSonarQubeEnv('sonarqube-6') {

                   sh 'mvn clean package sonar:sonar'

                }
            }
        }

        stage("Quality Gate") {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    // Parameter indicates whether to set pipeline to UNSTABLE if Quality Gate fails
                    // true = set pipeline to UNSTABLE, false = don't
                    // Requires SonarQube Scanner for Jenkins 2.7+
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}




