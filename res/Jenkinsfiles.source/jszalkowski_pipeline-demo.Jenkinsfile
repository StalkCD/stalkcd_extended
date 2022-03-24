Boolean isPR = env.CHANGE_ID != null

pipeline {
	//	tools { 'docker' }

	agent any
	//	parameters {
	//		string(name: 'BRANCH', description: 'Specify the branch to build')
	//	}
	stages {
		stage ('scm') {
			steps{ //			git branch: "${BRANCH}", url: 'https://github.com/jszalkowski/pipeline-demo.git'
				checkout scm }
		}
		stage('integration') {
			when {
				environment name: 'GIT_BRANCH', value: 'integration'
			}
			steps{
				tool name: 'default', type: 'org.jenkinsci.plugins.docker.commons.tools.DockerTool'
				sh "docker build -t pipeline-demo ."
			}
		}
		stage('pr') {
			when { expression { isPR } }
			agent {
				docker { image 'pipeline-demo' }
			}
			steps{
				checkout([$class: 'GitSCM', branches: [[name: '${BRANCH}']], doGenerateSubmoduleConfigurations: false, extensions: [
						[$class: 'PreBuildMerge', options: [mergeRemote: 'https://github.com/jszalkowski/pipeline-demo.git', mergeTarget: 'master']]
					], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/jszalkowski/pipeline-demo.git']]])
				tool name: 'default', type: 'org.jenkinsci.plugins.docker.commons.tools.DockerTool'
				sh 'mvn verify'
				sh 'mvn clean install'
			}
		}

		stage('master') {
			when {
				environment name: 'GIT_BRANCH', value: 'master'
			}
			steps{
				tool name: 'default', type: 'org.jenkinsci.plugins.docker.commons.tools.DockerTool'
				sh 'kubectl create -f pipeline-demo.yml'
			}
		}
	}
}

