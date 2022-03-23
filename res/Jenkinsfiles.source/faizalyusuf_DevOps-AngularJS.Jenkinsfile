pipeline{
    agent {label 'mac'} 
    stages {
        
        stage('Build & Unit Test'){
            agent {
                docker {
                    image 'maven:3.5-alpine'
                    label 'mac'
                    args '-v /root/.m2:/root/.m2:rw'
                }
            }
            steps {
                sh 'mvn clean install'
            }
            post {
                always {
                    //junit
                    junit 'target/surefire-reports/*.xml'
                }
            }
        }
        
        /*stage('Code Analysis'){
            agent {
                docker {
                     image 'newtmitch/sonar-scanner'
                     label 'ciagent'
                     args '-v /root/.sonar:/root/.sonar:rw'
                   }
            }
            steps {
                sh "sonar-scanner"
            }
        }
        
        stage('Integration Testing'){
            agent {label 'ciagent'}
                steps {
                        script {
                            def testcon=docker.build('angsystest').run(['--name=systest_con -p 8888:8080'])
                        }
                        sh "docker run --privileged --rm --net=host -v /dev/shm:/dev/shm -v ${WORKSPACE}/src/test:/protractor webnicer/protractor-headless protractor-conf.js"
                        sh "docker stop systest_con"
                        sh "docker rm systest_con"
			sh "docker rmi angsystest" //rmi is the command used to remove docker images
                }
            
        }
        
        stage ('Upload Artifacts') { 
		    agent {label 'ciagent'}
	            steps {
		        script {
                    def server = Artifactory.newServer url: 'http://10.101.10.45:8081/artifactory', credentialsId: 'artifactory-creds'
                    def uploadSpec = 
                """
                    {
                    "files": [
                        {
                        "pattern": "target/(*).war",
                        "target": "example-repo-local/V${currentBuild.number}/war/"
                        }
                    ]
                    }
                """
                def buildInfo = Artifactory.newBuildInfo() 
                buildInfo.env.capture = true 
                buildInfo=server.upload(uploadSpec) 
                server.publishBuildInfo(buildInfo)
		        }
	        }		
        }// end Artifact Upload Stage

	stage ('Deploy') {
		agent {label 'ciagent'}
		steps {
		script {
        build job: 'Deployment-Pipeline', parameters:[[$class: 'StringParameterValue', name: 'Application', value: 'angularjavaapp'], [$class: 'StringParameterValue', name: 'Environment', value: 'demo'],[$class: 'StringParameterValue', name: 'Build_number', value: currentBuild.number.toString()],[$class: 'StringParameterValue', name: 'Storage_path', value: 'example-repo-local'],[$class: 'StringParameterValue', name: 'Artifact_name', value: 'AngularJavaApp']]
		}
		}
	}*/    
	
    }//end stages
    
    
}//end pipeline
