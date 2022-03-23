#!/usr/bin/env groovy


//all declarations must be enclosed within a pipeline block
pipeline {
    //agent section specifies where the pipeline will execute in the Jenkins environment depending on where the agent section is placed.
    agent any // any - on any available agent

    stages {
        stage('Pull-request voting') {

            when { branch "PR/*" }
            //define one or more steps
            steps {

                
                    sh "mvn clean install"

                    
                
            }
        }

        stage('Hello') {
            when { branch 'master' }
            steps {
                lock(resource: "${env.JOB_NAME}/10", inversePrecedence: true) {
                    milestone 10
                    echo "Hello"
                }
            }
        }

       
   } 
}