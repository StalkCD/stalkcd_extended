// __author__ = "Vivek Ganesan"
pipeline {
    agent {
        docker {
			image 'vivekjarvis/sele_py_jar_allure:v1.0'
		}
	}
    parameters {
		choice(name: 'TEST_ENV', choices: 'DEV\nUAT\nSTAGING\nPROD', description: 'Testing environment:')
		choice(name: 'TAGS', choices: 'prod\nreg\nsanity\nuat\ndev\nunittest\nnone', description: 'Tags to be executed:')
    }
    stages {
        stage('Build') {
            steps {
                slackSend (color: '#439FE0', message: "Build Running on : Instance = '${env.TEST_ENV}' | Tag = '${env.TAGS}'" )
                echo "BUILD : Running"
                slackSend (color: 'good', message: "BUILD: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
            }
        }
        stage('Execute') {
            steps {
                slackSend (color: 'warning', message: "Execute Running")
                echo "PIPELINE : pipeline.py"
                sh 'python3 pipeline.py'
                slackSend (color: 'good', message: "EXECUTE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
            }
        }
        stage('Report') {
            steps {
                echo "REPORT:"
                slackSend (color: '#439FE0', message: "DEPLOYMENT : Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                script {
                allure ([includeProperties: false, jdk: '', results: [[path: 'allure-results'], [path: 'allure-results']]])
                }
            }
        }
    }
}