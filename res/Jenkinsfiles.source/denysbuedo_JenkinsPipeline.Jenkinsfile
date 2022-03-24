/*node {
    try {
        stage ('Clone') {
        	echo 'shell scripts to Clone project...'
        }
        stage ('Build') {
        	echo 'shell scripts to build project...'
        }
        stage ('Tests') {
	        parallel 'static': {
	            echo 'shell scripts to run static tests...'
	        },
	        'unit': {
	            echo 'shell scripts to run unit tests...'
	        },
	        'integration': {
	            echo 'shell scripts to run integration tests...'
	        }
        }
      	stage ('Deploy') {
            echo 'shell scripts to deploy to server...'
      	}
    } catch (err) {
        currentBuild.result = 'FAILED'
        throw err
    }
}
*/
pipeline {
    agent { docker { image 'maven:3.3.3ASasasxaxAxcsfgegbwgrwg cv scv sX' } }
    stages {
        stage('build') {
            steps {
                sh 'mvn --version'
            }
        }
    }
}


pipeline {
    agent { docker { image 'maven:3.3.3ASasasxaxAxcsfgegbwgrwg cv scv sX' } }
    stages {
        stage('build') {
            steps {
                sh 'mvn --version'
            }
        }
    }
}

