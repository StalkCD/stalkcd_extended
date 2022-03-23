pipeline {
	agent none
	stages {
		stage('Build the Angular app') {
      agent {
        dockerfile {
          dir 'seagul/build'
        }
      }
      steps {
        dir('seagul'){
          sh 'npm i'
          sh 'ng build --prod'
        }
      }
		}
		stage('Do the deployement') {
			agent any
			steps {
				sh 'find .'
			}
		}
	}
}
