Jenkinsfile

pipeline {
    agent { docker { image 'maven:3.3.3' } }
    stages {
        stage('build') {
            steps {
                sh 'mvn --version'
            }
        }
    
    
    stage('Deploy') {
       steps {
           timeout(time: 3, unit: 'MINUTES') {
                retry(5) {
                    sh './flakey-deploy.sh'
					}
				}
			}
		}
	}
	
	post{
		always{
			echo 'Fin de pipeline'
		}
		failure{
			echo 'Falla algo'
		}
		success{
			echo 'todo peola atr'
		}
		unstable{
			echo 'unstable'
		}
		changed{
			echo 'cambio de estado de pipeline'
		}
	}
}
