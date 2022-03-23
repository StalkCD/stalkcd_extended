pipeline {
         agent any
         stages {
                 //stage('SonarQube Analysis') {
                 //steps {
                  //  input('Do you want to proceed?')
                 //   withSonarQubeEnv('Sonar') {
                    // requires SonarQube Scanner for Maven 3.2+
                 //   bat 'mvn org.sonarsource.scanner.maven:sonar-maven-plugin:3.2:sonar'
                  //      }
                  //   }         
               //  }
                 stage('Code Build') {
                 steps     {
                       input('Do you want to proceed with build & war creation?')
                       withMaven(
                          // Maven installation declared in the Jenkins "Global Tool Configuration"
                          maven: 'mvn',
                          // Maven settings.xml file defined with the Jenkins Config File Provider Plugin
                          // Maven settings and global settings can also be defined in Jenkins Global Tools Configuration
                          mavenSettingsConfig: 'maven',
                          mavenLocalRepo: 'C:\\Users\\330406\\.m2\\repository') {

                           // Run the maven build
                           bat 'cd C:\\Users\\330406\\.jenkins\\workspace\\Demo\\Demo\\'
                           bat 'mvn clean package'

                      }   
                          
                          
                       //bat 'cd C:\\Users\\330406\\.jenkins\\workspace\\Pipeline\\Pipeline\\'
                       //bat 'mvn clean package'
                       echo "war creation successful!!"
                           }
                 }
                 stage('Dev Deployment') {
                 steps {
                       input('Do you want to proceed with Dev deployment?')
                       //bat 'RENAME C:\\Users\\330406\\.jenkins\\workspace\\Pipeline\\target\\Pipeline-1.0.war Pipeline.war'
                       //bat 'copy C:\\Users\\330406\\.jenkins\\workspace\\Pipeline\\target\\Pipeline.war D:\\Software\\apache-tomee-plus-7.0.2\\webapps\\'
                       bat 'D:\\Essentials\\WAS855\\AppServer85\\profiles\\AppSrv01\\bin\\wsadmin -lang jython -f D:\\Vinayak\\Learning\\WAS_Deploy_Script\\installApplication.py'
                       echo "Dev Deployment Successful!!"
                           }
                 }
                 stage('Testing') {
                 steps {
                         echo "Testing Successful!!"
                           }
                 }
                 stage('Prod Deployment') {
                 steps {
                       echo "Production Deployment Successful!!"
                           }
                 }
         }
}
