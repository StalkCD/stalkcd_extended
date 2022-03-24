pipeline {
	agent any
	environment {
		DB_ENGINE= 'sqlite'
	}
	tools {
		jdk 'java'
		maven 'maven'
	}
	stages {
		stage('Inicio') {
			steps {
				echo 'Hola mundo'
			}
		}
		stage('¿Dónde está maven?') {
			steps {
				sh 'echo "${MAVEN_HOME}"' 
			}
		}
		stage('Variables de entorno') {
			steps {
				sh 'printenv'
				sh 'echo "${PATH}"'
				input '¿El ambiente es correcto?'
			}
		}
		stage('Pruebas') {
			steps {
				echo 'Ejecutando pruebas unitarias del proyecto'
				sh 'mvn test'
				junit(allowEmptyResults: true, testResults:'**/target/surefire-reports/*.xml')
			}
		}
		stage('Empaquetado') {
			steps {
				echo 'Empaquetando la aplicación'
				sh 'mvn package'
			}
		}
		stage('Ejecución') {
			steps {
				echo 'Ejecutando el paquete'
				sh 'mvn exec:java -Dexec.mainClass="com.pipeline.test.App"'
			}
		}
	}
	post {
		always {
			echo 'El buid ha terminado'
		}
		success {
			echo 'Build correcto'
		}
		failure {
			echo 'El build ha fallado'
			mail to:'j.aguilartablada@ibermatica.com',
				subject: 'pipeline',
				body: 'Algo ha fallado en la ejecución del pipeline de Jenkins'
		}
		changed {
			echo 'Algo ha cambiado'
		}
	}
}
