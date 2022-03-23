pipeline{
  agent any
  
 stages {
  stage('Preparation') {
      
      steps 
      {
       deleteDir()
       git 'https://github.com/akshaygit/Devops-Test'
      }
	 }
   
  stage('Compile Stage'){
     
	 steps {
	   sh 'mvn compile'
  }
 }
 
 stage ('Testing Stage') {
 
 steps {
	   sh 'mvn clean test'
  }
 }
 
 stage ('Functional Testing') {
            steps {
                //sh 'mvn clean verify jacoco:prepare-agent install jacoco:report -Psonar'
                sh 'mvn clean test -X jacoco:report -Psonar -Djacoco.file.path="/home/ubuntu/.jenkins/workspace/DevOpsPipeline/examples/feed-combiner-java8-webapp/target/jacoco.exec"'
            }
            post {
                success {
                    junit '**/target/*-reports/*.xml'
                    jacoco(execPattern: 'examples/feed-combiner-java8-webapp/target/jacoco.exec')
                    archive "target/**/*"
                }
            }
        }

stage('SonarQube analysis') {
    steps
    {
    script
       {    
        def scannerHome = tool 'Sonar_Scanner';
        withSonarQubeEnv('SonarQube Analysis') {
        sh "/home/ubuntu/sonar-scanner/bin/sonar-scanner"
        }
        }
       }
      }
       
stage("SonarQube Quality Gate Analysis") { 
  steps
     {  script
         {
           timeout(time: 1, unit: 'HOURS') { 
           def qg = waitForQualityGate() 
           if (qg.status != 'OK') {
             //currentBuild.result = 'FAILURE'
             sh 'echo "Build failed due to Quality Gate failure : $BUILD_URL" | mail -s "Jenkins Build Number : $BUILD_NUMBER with RESULT: FAILURE" bisht.akshay007@gmail.com,akshay.bisht@genpact.com'
             error "Pipeline aborted due to quality gate failure: ${qg.status}"
          }
        }
      }
    }
  }
  
stage ('Artifact Nexus Deployment Stage') {
 
 steps {
	   sh 'mvn deploy'
       }
 }   
stage ('Artifact Deployment Stage') {
 
 steps {
	   sh 'cp /home/ubuntu/.jenkins/workspace/DevOpsPipeline/examples/feed-combiner-java8-webapp/target/devops.war /home/ubuntu/Deploy-Server/webapps'
	   //Copying artifact for use with Dockerfile
	   sh 'cp /home/ubuntu/.jenkins/workspace/DevOpsPipeline/examples/feed-combiner-java8-webapp/target/devops.war /home/ubuntu/.jenkins/workspace/Docker-Pipeline'
  }
 }

stage ('Notifying Users') {
 steps {
       sh 'echo "A build has been completed in Jenkins : $BUILD_URL" | mail -s "Jenkins Build Number $BUILD_NUMBER result : SUCCESS" bisht.akshay007@gmail.com,akshay.bisht@genpact.com'
      } 
  }
}  
post
 {
     always {
         script {
   withEnv(['JIRA_SITE=Jira']) {
    def testIssue = [fields: [ 
                               project: [id: '10000'],
                               //summary: 'New JIRA Created from Jenkins.',
                               //description: 'New JIRA Created from Jenkins.',
                               //customfield_1000: 'customValue',
                               // id or name must present for issuetype.
                               issuetype: [id: '10002']]]

    response = jiraEditIssue idOrKey: 'DSP-1', issue: testIssue

    echo response.successful.toString()
    echo response.data.toString()
     }
     }
     }
}
} 

