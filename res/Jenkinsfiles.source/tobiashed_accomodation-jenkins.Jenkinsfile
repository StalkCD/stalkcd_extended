pipeline{
    agent any
    stages{
        stage('Checkout'){
            steps{
                checkout scm
            
            }
          
        }
        stage('Build web-app'){
            steps{
                sh 'mvn -f /home/robot/.jenkins/workspace/test-jenkins-pipeline/hoteljsf clean install'
            
            }
          
        }
        stage('Build web-service'){
            steps{
                sh 'mvn -f /home/robot/.jenkins/workspace/test-jenkins-pipeline/hotel-restfull clean install'
            
            }
          
        }
        stage('Deploy artifacts'){
            steps{
                sh 'asadmin deploy --force=true /home/robot/.jenkins/workspace/test-jenkins-pipeline/hotel-restfull/target/hotel-rest.war'
                sh 'asadmin deploy --force=true /home/robot/.jenkins/workspace/test-jenkins-pipeline/hoteljsf/target/hotel.war'
            
            }
          
        }
        stage('Clean database'){
            steps{
                sh 'psql -h localhost -U postgres hotel -f /home/robot/.jenkins/workspace/test-jenkins-pipeline/hoteljsf/database-backup.sql'
                
            }
          
        }
    }

}
