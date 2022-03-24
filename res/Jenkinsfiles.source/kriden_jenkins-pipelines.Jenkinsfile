pipeline {
  agent any

  tools {
    maven 'Maven3.2.1'
    jdk 'JDK1.8'
  }

  stages {

    stage('Deploy') {
      steps {
         docker.withRegistry('https://hub.docker.com/', 'dockerhub-credentials') {
            def app = docker.build "jenkins-pipeline"
         }
         print "Deploy docker image"
      }
    }

    stage('Build') {
      steps {
          sh 'mvn install'
      }
    }

    stage('Quality Gate') {
      steps {
        parallel(
          "Sonar": {
              sh 'mvn org.jacoco:jacoco-maven-plugin:prepare-agent -Dmaven.test.failure.ignore=false'
              withSonarQubeEnv('SonarQubeServer') {
                sh 'mvn sonar:sonar'
              }

              withSonarQubeEnv('SonarQubeServer') {
                    timeout(time: 1, unit: 'HOURS') {
                          script {
                            def qg = waitForQualityGate()
                            if (qg.status != 'OK') {
                              error "Pipeline aborted due to quality gate failure: ${qg.status}"
                            }
                          }
                        }
              }
          },
          "Security": {
              sh 'mvn org.owasp:dependency-check-maven:2.1.0:check'
          }
        )
      }
    }
  }
}