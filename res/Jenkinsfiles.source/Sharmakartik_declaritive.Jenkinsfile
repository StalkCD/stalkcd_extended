pipeline {
  agent any
  tools {
  jdk 'java'
  maven 'maven'
   }
  stages {
        stage('Build') { 
            steps {
                
                bat 'mvn -B -DskipTests clean package' 
            }
        }
        stage('Test') { 
            steps {
                bat 'mvn test' 
            }
            post {
                always {
                    junit 'target/surefire-reports/*.xml' 
                }
            }
        }
   
       stage('sonarcube analysis') {
            steps {
               withSonarQubeEnv('sonarserver'){
                 bat 'mvn sonar:sonar'
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
     
     stage('Ready API(soap UI)'){
       steps{
         echo """ 
            FOR RUNNING THIS STAGE YOU NEED AN AGENT HAVING READY API TOOL.
            SoapUIPro environment: '',
            pathToProjectFile: 'C:\\Default-SoapUI-Pro-Project-readyapi-project.xml',
            pathToTestrunner: 'C:\\Program Files\\SmartBear\\ReadyAPI-2.5.0\\bin',
            projectPassword: '',
            testCase: 'REST TestCase',
            testSuite: 'TestSuite' """  
             
       }
          
          }
     stage('xldeploy') {
      parallel {   
        stage('Package') {  
          steps{
           echo """
             xldCreatePackage artifactsPath: 'build/libs',
             manifestPath: 'deployit-manifest.xml', 
             darPath: '$JOB_NAME-$BUILD_NUMBER.0.dar' """
              } 
            }
         stage('Publish') {
           steps{
          echo """
              xldPublishPackage darPath: 'path-of-dar', 
              serverCredentials: 'admin_xldeloy' """ 
             
             }    
           }
         stage('Deploy') {
           steps{
           echo """
             xldDeploy environmentId: 'Environments/env-of-xldeploy', 
             packageId: 'Applications/name-of-application', 
             serverCredentials: 'admin_xldeloy' """
                             
           }
         } 
       }        
    }

  }
post {
    failure {
        mail to: 'kartik3588@gmail.com',
             subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
             body: "Something is wrong with ${env.BUILD_URL}"
    }
    success {
       echo """ 
             ONLY PRINT
             mail to: 'kartik3588@gmail.com',
             """
             
     }
   }
 }

