/*import jenkins.model.**/
pipeline{
    agent any
    stages{
        stage('CI-Unit Test/Coverage'){
            steps {
                bat "newman run CodeCoverage.json --environment SAPEC8EnvCodeCoverage.json"
		   
            }
        }
	    stage('CI-Code Review'){
	    steps{
		bat "newman run ATCCheckLegacy.json --environment SAPEC8EnvCodeCoverage.json"
	    }
	}
	
	stage('CD-Deploy To QA'){
	    steps{
		bat "newman run DeployToQuality.json --environment SAPEC8EnvCodeCoverage.json"
	    }
	}
  
  stage('CI-End To End Test'){
	    steps{
		bat "newman run E2ETest.json --environment SAPEC8EnvCodeCoverage.json"
	    }
	}
	}
}	

/*def GITURL = 'https://github.com/gsarunk/AbapUnit.git'
def BRANCH = 'master'
def PIPELINE_GITURL = 'https://github.com/gsarunk/abap-ci-postman.git'
def PACKAGE = '''ZABAPUNIT'''
def COVERAGE = 80
def VARIANT = "DEFAULT"
parallel (
    "NPL":{
        node {
        	def LABEL = "NPL"
        	def HOST = "52.87.34.126"
        	def CREDENTIAL = "NPL"
        	
        	git poll: true, branch: BRANCH, url: GITURL
        		
        	stage('[' + LABEL + '] Preparation') {
        		deleteDir()
        		dir('sap-pipeline') {
        			bat "git clone " + PIPELINE_GITURL + " ."
        		}
        	}
        	
        	def sap_pipeline = load "sap-pipeline/sap.groovy"
        	sap_pipeline.abap_unit(LABEL,HOST,CREDENTIAL,PACKAGE,COVERAGE)
        	sap_pipeline.abap_sci(LABEL,HOST,CREDENTIAL,PACKAGE,VARIANT)
        	sap_pipeline.sap_api_test(LABEL,HOST,CREDENTIAL)
        }
    }
    /* Add more system as needed...
	,"NPL":{
        node {
        	def LABEL = "NPL"
        	def HOST = "vhcalnplci.dummy.nodomain"
        	def CREDENTIAL = "NPL"
        	
        	git poll: true, branch: BRANCH, url: GITURL
        		
        	stage('[' + LABEL + '] Preparation') {
        		deleteDir()
        		dir('sap-pipeline') {
        			bat "git clone " + PIPELINE_GITURL + " ."
        		}
        	}
        	
        	def sap_pipeline = load "sap-pipeline/sap.groovy"
        	sap_pipeline.abap_unit(LABEL,HOST,CREDENTIAL,PACKAGE,COVERAGE)
        	sap_pipeline.abap_sci(LABEL,HOST,CREDENTIAL,PACKAGE,VARIANT)
        	sap_pipeline.sap_api_test(LABEL,HOST,CREDENTIAL)
        }
	} 
)*/
