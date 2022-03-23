@Library('shared-pipeline-library')_
import net.netinsight.globalVars

pipeline {
  // agent { label 'vdocker2' }
  agent any
  stages {
    stage('Init') {
      steps {
        echo 'Initializing Pipeline from TFS'
        echo "Workspace:  ${WORKSPACE}"
      }
    }
	stage('Shared Library - vars') {
	  steps {
	    echo 'Hello World'
	    sayHello 'Dave'
	  }
	}
	stage('Shared Library - src') {
	  steps {
        println globalVars.foo
	  }
	}
	stage('Shared Library - resources') {
	  steps {
		powershellLibraryScript resource: 'ps/myFunction.ps1', script: 'MyFunction -Arg1 hello -Arg2 world'
	  }
	}
	stage('Shared Library - json parser') {
	  steps {
		echo 'get settings'
		getSettings 'http://vengauto1:3000/api/devops/settings/5bc7606cb02e7c16941bf570'
	  }
	} 

	stage('Interactive_Input ') {
      agent none
      steps {
        timeout(1) {         // timeout waiting for input after 1 minute
          script {			// script tag to drop in to Groovy
            
			// Single value response returns value directly, don't need a name

			env.TARGET_ENV = input message: 'Target Environment',
			       parameters: [choice(name: 'Target', choices: 'vDocker2-Circuits\nvDocker2-WebAPI\nEMEIER01', description: 'Select a test environment')],
				   ok: 'Continue' 
			

            env.RELEASE_SCOPE = input message: 'Build Type', 
                    parameters: [choice(name: 'Scope', choices: 'patch\nminor\nmajor', description: 'Select the release scope')],
					ok: 'Continue'
			

			// Multiple value response returns in a map of values so need to provide a name
			inputMap = input message: 'Builds Settings', ok: 'Continue',
                    parameters: [string(defaultValue: '0', description: 'Release', name: 'Release'), string(defaultValue: '0', description: 'Build', name: 'Build')],
					submitter: 'admin,Ed,user1,user2,group1', submitterParameter: 'APPROVER'			

			echo "Target Environment: ${env.TARGET_ENV}"
			echo "Release Scope: ${env.RELEASE_SCOPE}"			
			echo "Approver: ${inputMap['APPROVER']}"
            echo "Release: ${inputMap['Release']}"
			echo "Build: ${inputMap['Build']}"

          } //script
        } // timeout
      }
    }
	stage('Call API') {
	  steps {
		script {
		  httpRequest(url: 'http://vengauto1:3000/api/devops/settings/5bc7606cb02e7c16941bf570', acceptType: 'APPLICATION_JSON', consoleLogResponseBody: true, contentType: 'APPLICATION_JSON', httpMode: 'GET', responseHandle: 'STRING', validResponseCodes: '200', outputFile: 'settings.json')
		  def myFile = readFile 'settings.json'
		  echo "${myFile}"
		}
	  }
	}
	stage('Parallel') {
      steps {
        parallel(
          "Step 1": {
			script {
			echo "local powershell command"
			def ping = powershell(script: 'ping localhost', returnStatus: false, returnStdout: true)
			echo "ping: ${ping}"
			}
          },
          "Step 2": {
			script {
			echo "local powershell command"
			def ping = powershell(script: 'ping localhost', returnStatus: false, returnStdout: true)
			echo "ping: ${ping}"
			}

          },
          "Step 3": {
			script {
			echo "local powershell command"
			def ping = powershell(script: 'ping localhost', returnStatus: false, returnStdout: true)
			echo "ping: ${ping}"
			}

          }
        )
      }
    }
	stage('Ping') {
		steps {
			script {
			echo "local powershell command"
			def ping = powershell(script: 'ping localhost', returnStatus: false, returnStdout: true)
			echo "ping: ${ping}"
			}
		}
	}
        stage("Sequential") {
            parallel {
                stage("Stage 1") {
                    stages {
                        stage("Step A") {
                            steps {
                                echo "here"
                            }
                        }
                        stage("Step B") {
                            when {
                                branch "branch"
                            }
                            steps {
                                echo "here"
                            }
                        }
                    }
                }

                stage("Stage 2") {
                    stages {
                        stage("Step C") {
                            steps {
                                echo "here"
                            }
                        }
                        stage("Steb D") {
                             steps {
                                echo "here"
                            }
                        }
                    }
                }
            }
        }
	stage('powershell') {
	  steps {
	    echo "powershell command from module"
		powershell '''
		  Import-Module -Name .\\\\Automation-Module.psm1 -Verbose
		  Get-Command Ping-Localhost
		  Ping-Localhost asdasd
		'''
	  }
	}
  }
}
