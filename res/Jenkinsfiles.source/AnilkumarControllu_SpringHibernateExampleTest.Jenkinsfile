#!groovy
  def app
pipeline {

 agent any 
  tools {
     maven 'maven3'
  }
  
  stages {
    
     stage ('Java Build') {
       steps {
         //sh 'mvn clean install -DskipTests'
         sh 'mvn clean package -U'
       }
     }
	
		stage('Sonar') {
            steps {
               sh "whoami"
               //sh "mvn org.sonarsource.scanner.maven:sonar-maven-plugin:3.3.0.603:sonar -Dsonar.host.url=http://sonar-devel.local"
            }
        }  
    
    stage('Create Docker Image') {
     steps{
      //sh "sudo docker stop devops-poc2/pipeline:latest" 
      //sh "sudo docker rm devops-poc2/pipeline:latest" 
      sh "sudo docker build -t devops-poc3/pipeline:latest ."
      sh "sudo docker-compose up -d"
          }
     }
 
    stage('Run Docker Image') { 
                       
     steps{
      
         //sh "sudo docker run -p8086:8080  devops-poc1-${env.VERSION_NUMBER}/pipeline:latest"     
         sh """
                    sudo docker run -d \
                        -p8088:8080 \
                        -v /var/run/docker.sock:/var/run/docker.sock:ro \
                        -e TIMEOUT=30 \
                        devops-poc3/pipeline:latest
            """                        
           } 
       
      }
	  
	   stage ('Testing Stage') {

            steps {
                withMaven(maven : 'maven_3_5_0') {
                    sh 'mvn test'
					sh 'mvn clean test -Dwebdriver.base.url=http://www.google.com'
					//sh 'mvn clean test -Dwebdriver.type=chrome -Dwebdriver.chrome.driver=E:/Workspace/chromedriver.exe'
                }
            }
        }
   

  }
}
