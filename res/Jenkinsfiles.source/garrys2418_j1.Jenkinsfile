#!groovy
/*
	Required Project Default Descriptors:
		pipeline_project 	:: project SCM key						
		pipeline_component	:: Name of  sub component of project
		pipeline_release	:: Release of project				
		pipeline_email		:: Development owners of project	
		pipeline_version	:: Version of project
*/

pipeline {
    
agent none

	environment{
		pipeline_project 	= 'test1'
		pipeline_component 	= 'test1'
		pipeline_release 	= '0.0.0'
		pipeline_email 		= 'garrys2418@gmail.com'
		pipeline_version 	= "${env.pipeline_release}.${env.BUILD_NUMBER}"
		env_name			= "testp"
		
	}

stages{
       
        stage('sources'){
            agent any
            steps{checkout scm}
        }
        stage('users'){
            agent any
            steps{load "plays/users/users.groovy"}
        }
        stage('iptables'){
         
        agent any
            steps{load "plays/iptables/iptables.groovy"}
        }
        
		}	
			
			
			
}