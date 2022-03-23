/*
Resources: 
https://github.com/jenkinsci/pipeline-model-definition-plugin/wiki/Syntax-Reference 
*/
pipeline{
    	/* --- agent is a mandatory. It determines where your build runs ---
	
	"agent 'any'" - Run on any node
	"agent none" - Don’t run on a node at all. Manage node blocks yourself within your stages.
	"agent{ docker 'ubuntu:latest' }" - Run on any node within a Docker container of ubuntu image.
	
	*/
	//agent none // agent is a mandatory for declarative pipeline
	//agent any
	/*agent{
		docker "ubuntu:latest"
	}*/
	
	agent 'any'
	//agent{ docker 'ubuntu:latest' }
	/*agent{
		docker{
			image 'ubuntu:latest'
			//label 'docker-node'
		}
	}*/
	
	/* Tools - only works when *not* on docker or dockerfile agent */
	tools{
		maven "M3.5" //M3 is the name of the Maven tool configured in Jenkins Global Tool Configuration
	}
	
	/* environment is a block of key = value pairs that will be added to the envionment the build runs in. */
	environment{
		VERSION="1.0.0"
		ARTIFACT_NAME="Artifact_001"
		FIRSTNAME="Vish"
		LASTNAME="Manc"
		FULLNAME="${FIRSTNAME} ${LASTNAME}"
	}		
	
	stages{
		    stage("stage1"){
			    /*
			    stage block should contain one and only one steps block
			    steps block contains the actual work of your stage.
			    */
			    steps{			    
				// Printing using Shell
				sh "echo Hello Shell"
				
				/* Printing using Batch */
				//bat "echo Hello Batch"
			    }
		    }

		    stage("stage2"){
			    steps{
				 //  Print using default Sample step in Pipleine generaiong script
				 echo 'Hello...This message is printed using default Sample Step in Pipeline Script generator'
				 echo "Version is:  ${VERSION}"
				 echo "Full Name: ${FULLNAME}"
				 
				 script{
				    /*
				    Check OS is Unix or not?
				    */
				    if(isUnix()){
					    echo "You are running on Unix OS"
				    }
				    
				    else{
					    echo "You are not running on Unix OS"
				    }
				 }
			    }
		    }

		    stage("stage3"){
			    /* overriding globally defined agent */
			    agent{ docker 'ubuntu:latest' }
			    
			    steps{
				    timeout(time: 3, unit: 'MINUTES'){
					    // Print Hello to a samp.txt file
					    sh 'echo "Hello..I am going to a Hello.txt file" > Hello.txt'
				    }
			    }
		    }
		
		    stage("stage4"){
			/*
			tools{
				// Define the tools to be override the global tools defined.
			}
			*/
			    
			    
			/*
			stage block should contain atmost one and only one when block. It shouldn't be located inside steps block.
			*/
			when{
				// Check the branch is master
				branch "master"
				
				// check the environment variable "FIRSTNAME" has the value "Vish"
				environment name: "FIRSTNAME", value: "Vish"
				
				//Expressions. Only run if the expression doesn't return false/null.
				expression{
					return 3>2
				}
			}
			
			steps{
				sh "echo the branch is master"
				sh "echo Environment variable, FIRSTNAME has Vish as value"
				sh "echo expression satisfied"
				
				/* Keep trying this if it fails up to 5 times */
				retry(5){
					echo "--Attempted--"
				}
			}			
		    }
		
		    stage('stage-parallel'){
			steps{
				parallel (
				firstBlock: { sh "echo p1; sleep 5s; echo first block of stage-parallel" },
				secondBlock: { sh "echo p2; sleep 10s; echo second block of stage-parallel" }
				)			
			     }

			    //Lines of post block are logged. Not displayed in the pipeline.
			    post{
				 always{ echo "I am running inside a stages block" }
			    }
		    }
		    
		    stage("Clean"){
			    steps{
				    sh "mvn clean"
			    }
		    }
		
		    stage('Javadocs'){
			    steps{
				    //Generate javadocs for src code
				    sh "mvn javadoc:javadoc"
			    }
		    }

	            stage('Compile'){
			    steps{
				    //Compile code with Maven configured. M3 is the name given for Maven installation in Global Tool Configuration
				    sh "mvn compile"
			    }
	            }

	            stage('UnitTests'){
			    steps{
				    //Unit test the compiled code with Maven test target.
				    sh "mvn test -DtestFailureIgnore=true"
			    }	            
	            }

	            stage('IntegrationTests'){
			    steps{
				    //Integration test the compiled code with Maven integration-test target.
				    sh "mvn integration-test"
			    }
	            }

		    /* Commented temporarily
	            stage('StaticCodeAnalysis'){
			    steps{
				    withSonarQubeEnv('sonarqube'){
					    //Maven clean. M3 is the name given for Maven installation in Global Tool Configuration
					    sh "mvn sonar:sonar -Dsonar.host.url=http://192.168.0.15:9000 -Dsonar.profile=vn_quality_profile1"
				    }
				    
				    sleep time: 30, unit: 'SECONDS'
				    timeout(time: 10, unit: 'MINUTES') {
					    script{
						    def qg = waitForQualityGate()
						    if (qg.status != 'OK') {
							    error "Pipeline aborted due to quality gate failure: ${qg.status}"
						    }
					    }
				    }
			    }
		    }
		    */
		
		    stage('TestReport'){ 
			    steps{
				    /* 
				    "surefire-report:report-only" creates HTML reports from the existing unit test cases executed results. 
				    */
				    sh "mvn surefire-report:report-only"
			    }
		    }
		
		    stage('MavenPackage'){
			    steps{
				    //Genarate package
				    sh "mvn package"
			    }
		    }
		
		    stage('ArtifactsArchival'){
			    steps{
				    /* 
				    With archive inctruction, mentioned file/s will be displyed in jenkins to download
				    Multiple artifacts not working. Need to look.
				    */
				    archive "target/*.jar"
			    }
		    }
		
		stage('ArtifactUpload'){
			/* 
			Method 1: Using 'nexusArtifactUploader'. 
			- Must Install "Nexus Artifact Uploader" in Jenkins otherwise Jenkins throws error.
			- Artifact uploading to Nexus for non-maven based projects (also maven). 
			- You can use for Maven projects also, but the generated artifact should be in the workspace's job root directory.
			*/
			/*steps{
				nexusArtifactUploader(
					nexusVersion: 'nexus3',
					protocol: 'http',
					nexusUrl: '192.168.0.15:8081',
					groupId: 'MyGroup',
					version: '1.0',
					repository: 'maven-releases',
					credentialsId: 'Nexus-3.7',
					artifacts: [
					    [artifactId: 'myartifact',
					    type: 'jar',
					    classifier: '', // classifier is optional
					    file: 'target/HW_Maven-1.0.jar']				    
					]
				)
			}*/
			
			/*
			Method 2: Using 
			*/
			steps{
				//sh "mvn deploy"
				
				sh "mvn deploy:deploy-file \
				    -Durl=http://192.168.0.15:8081/repository/maven-releases/ \
				    -DrepositoryId=maven-releases \
				    -DgroupId=MyGroup \
				    -DartifactId=myartifact \
				    -Dversion=1.0  \
				    -Dpackaging=jar \
				    -Dfile=target/HW_Maven-1.0.jar"
			}
		}
	}
		
	/*
	Post block shouldn't be in a separate stage. Lines of post block are logged. 
	Steps inside post blcok aren't displayed in the pipeline.
	*/
	post{		
		success{ echo "I run only if the build is success." }
		failure{ echo "I run only if the build is failed." }
		unstable{ echo "I run only if the build is unstable." }		
		changed{ echo "I run only if the build status of the current build is different from the previous build." }
		always{	
			echo "Hi there? I run always irrespective of the build status"
			
			/* With junit instruction, Test results are grabbed by Jenkins to track them, calculates trends, and report on them */
			junit "target/surefire-reports/*.xml"
			
			
			/* Wipeout the workspace after every build */
			//deleteDir()
		}	
	}
}
