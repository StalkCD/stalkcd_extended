pipeline {
	agent none
	stages {
		stage('cpp-build') {
			agent {
				dockerfile { dir 'cpp-build' }
			}
			steps {
				sh 'gcc --version'
			}
		}
		stage('java-build') {
			agent {
				dockerfile { dir 'java-build' }
			}
			steps {
				sh 'javac -version'
			}
		}
	}
}

// test pipeline

// using a docker image provided externally
// docker.image('some image').inside {
//   stage("do stuff") {
//     sh "do stuff"
//   }
//
// }

