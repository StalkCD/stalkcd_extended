
pipeline{
    
    agent none
    
    environment{
        def gitHubUrl = 'https://github.com/harshjain25/demoservice1.git'
        def branchName = 'testbranch'
    }    

    stages{
        stage('checkout-build') {
            agent any
            
            steps{
                
                git  url: gitHubUrl, 
                branch: branchName
            
                sh 'mvn clean install -Dmaven.test.skip=true'
            }
        }
  
        stage('test'){
            agent any
            
            steps{
                sh 'mvn test'
            }
        }
        
        stage('integration-test'){
            agent any
            
            steps{
                sh 'mvn integration-test -P integration'
            }
        }
        
        stage('deploy-CI'){
            agent any
            
            steps{
                sh 'echo "mvn spring-boot:run -Dspring.profiles.active=dev" | at now +1 minutes'
            }
        }

        stage('qa-integration-test'){
            agent any

            steps{
                sh 'mvn integration-test -P integration'
            }
        }

        stage('UAT-deploy'){

            agent any
            steps{
                sh 'echo "mvn spring-boot:run -Dspring.profiles.active=qa" | at now +1 minutes'
            }
        }

    }
    
    post{
        success{
            echo 'yayy..!!'
            
//            mail to: 'harsh@theinnovationinc.co',
//             subject: "Failed Pipeline: ",
//             body: "Something is wrong with pipeline for demo service"
        }
        unstable{
            echo 'uh.. ohhh..something went wrong !!'
        }
        failure{
            echo 'build failed.. !!'
        }
    }
}