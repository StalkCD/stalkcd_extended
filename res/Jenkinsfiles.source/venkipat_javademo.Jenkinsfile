#!/usr/bin/env groovy
@Library('shared-libraries') _
import jenkins.*
def pipelineUtility
	
pipeline {
	
    agent {
        label 'java'
    }
    
    stages {
	 stage('init') {
            steps {
		script
		    {
		      pipelineUtility = new JenkinsPipelineBuilder()
                      pipelineUtility.initialize()		      
		    }              
            }
        }
        stage('clone') {
            steps {  
		    script {    
                       String project = 'javademo'
                       pipelineUtility.clone(project)
		    }
            }
        }
        stage('compile') {
            steps {
                echo "start compiling"
				sh script: 'javac HelloWorld.java'
				echo "stop compiling"
            }
        }
    }
}
