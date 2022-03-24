pipeline {
   agent any
   triggers {
      pollSCM('H/30 * * * *')
   }
   options {
      buildDiscarder(logRotator(numToKeepStr: '5'))
   }
   stages {
      stage('Maven Build & Test') {
         agent {
            dockerfile {
               reuseNode true
               additionalBuildArgs '--tag autoopsltd/decmaventest:testing'
               args '-v $HOME/.m2:/root/.m2'
            }
         }
         steps {
            sh 'mvn clean package'
            sh 'unset MAVEN_CONFIG && cd /root && ./mvnw spring-boot:start'
         }
         post {
            success {
               echo 'Maven packaging & testing worked!'
               archiveArtifacts artifacts: '**/target/*.war, **/target/*.jar'
               junit '**/target/surefire-reports/*.xml'
            }
         }
      }
      stage('Build Runnable Container') {
         agent {
            dockerfile {
               filename 'Dockerfile_w'
               reuseNode true
               additionalBuildArgs '--tag autoopsltd/decmaventest:run'
            }
         }
         steps {
            //sh 'mvn -B -DskipTests clean package'
            sh 'echo "Runnable container built"'
            // sh 'unset MAVEN_CONFIG && cd /root && ./mvnw spring-boot:start'
         }
      }
      stage('Docker Tag & Push Runnable') {
         steps {
            withDockerRegistry([ credentialsId: "dockerhub", url: "http://localhost:5000"]) {
               sh 'docker tag autoopsltd/decmaventest:run localhost:5000/decmaventest:run'
               sh 'docker push localhost:5000/decmaventest:run'
            }
         }
      }
      stage('Launch Docker Container') {
         when {
            branch 'master'
         }
         steps {
            sh 'docker-compose up -d'
         }
      }
   }
   post {
      always {
         echo 'Finshed running "decMavenTest" declarative pipeline job.'
      }
      success {
         echo 'Declarative pipeline job "decMavenTest" completed successfully and without error.'
         mail to: 'autoopsltd@outlook.com',
              from: 'jenkins-admin@admin.com',
              subject: "Successful Pipeline: ${currentBuild.fullDisplayName}",
              body: "Pipeline job completed successfully ${env.BUILD_URL}"
      }
      unstable {
         echo 'Declarative pipeline job "decMavenTest" is unstable - please view the logs.'
         mail to: 'autoopsltd@outlook.com',
              from: 'jenkins-admin@admin.com',
              subject: "Unstable Pipeline: ${currentBuild.fullDisplayName}",
              body: "Unstable - Something is wrong with ${env.BUILD_URL}"
      }
      failure {
         echo 'Declarative pipeline job "decMavenTest" failed - please view the logs.'
         mail to: 'autoopsltd@outlook.com',
              from: 'jenkins-admin@admin.com',
              subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
              body: "Failed - Something is wrong with ${env.BUILD_URL}"
      }
   }
}













