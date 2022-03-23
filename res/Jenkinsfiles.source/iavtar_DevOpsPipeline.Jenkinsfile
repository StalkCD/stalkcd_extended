#!/usr/bin/env groovy
//@Author: Indra Avatar Singh------May The Force be with U :X
pipeline{

	agent any
	
	environment{
		APPNAME="DevOps-01"
		DEBUG_FLAGS='-g'
		SLAVE_AGENT='Slave01'
		REL=''
		bld=''
	}
	
	//All jenkins job parameters will come here
	parameters{
		string(name: 'PHASE', defaultValue: 'BUILD', description: 'The stage to run pipeline')
		string(name: 'TARGET_ENV', defaultValue: 'SCAN')
		string(name: 'SLAVE_AGENT', defaultValue: 'Slave01')
		string(name: 'REL', defaultValue: 'dev')
		string(name: 'bld', defaultValue: 'st')
	}
	
	stages{
	
		stage("BUILD"){
			agent{
				node {
					label "${params.SLAVE_AGENT}"
					customWorkspace "/home/jenkins-slave-01/workspace/app/devsecops01"
				}
			}
			when{
				expression{	return "${params.PHASE}" =~ /(BUILD.*)/}
			}
			steps{
				echo "compile Stages"
				//sh 'cd /home/jenkins-slave-01/workspace/app/devsecops01'
				//sh 'chmod 777 /home/jenkins-slave-01/workspace/app/devsecops01'
				//sh 'rm -rf *'
				//sh 'mvn -version'
			}
		}
		
		stage("Publish"){
			agent{
				node {
					label "${params.SLAVE_AGENT}"
					customWorkspace "/home/jenkins-slave-01/workspace/app/devsecops01"
				}
			}
			when{
				expression{	return "${params.PHASE}" =~ /(BUILD.*)/}
			}
			steps{
				echo "Publish Stages"
			}
		}
		
		stage("Unit Test"){
			agent{
				node {
					label "${params.SLAVE_AGENT}"
					customWorkspace "/home/jenkins-slave-01/workspace/app/devsecops01"
				}
			}
			when{
				expression{	return "${params.PHASE}" =~ /(BUILD.*)/}
			}
			steps{
				echo "Unit Test Stages"
			}
		}
		
		stage("Sonar Code Quality"){
			agent{
				node {
					label "${params.SLAVE_AGENT}"
					customWorkspace "/home/jenkins-slave-01/workspace/app/devsecops01"
				}
			}
			when{
				expression{	return "${params.PHASE}" =~ /(BUILD.*)/}
			}
			steps{
				echo "Sonar Code Quality"
			}
		}
		
		stage("SAST-Veracode"){
			agent{
				node {
					label "${params.SLAVE_AGENT}"
					customWorkspace "/home/jenkins-slave-01/workspace/app/devsecops01"
				}
			}
			when{
				expression{	return "${params.PHASE}" =~ /(BUILD.*)/}
			}
			steps{
				echo "SAST Analysis"
			}
		}
		
		stage("DAST-OWASP-ZAP"){
			agent{
				node {
					label "${params.SLAVE_AGENT}"
					customWorkspace "/home/jenkins-slave-01/workspace/app/devsecops01"
				}
			}
			when{
				expression{	return "${params.PHASE}" =~ /(BUILD.*)/}
			}
			steps{
				echo "DAST-OWASP-ZAP"
			}
		}
		
		stage("Deploy"){
			agent{
				node {
					label "${params.SLAVE_AGENT}"
					customWorkspace "/home/jenkins-slave-01/workspace/app/devsecops01"
				}
			}
			when{
				expression{	return "${params.PHASE}" =~ /(BUILD.*)/}
			}
			steps{
				echo "Deploy"
			}
		}
		
		
		
	}
	
}