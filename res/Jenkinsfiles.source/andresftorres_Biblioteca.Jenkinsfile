pipeline {
 //Donde se va a ejecutar el Pipeline
 agent {
 label 'Slave_Induccion'
 }
 //Opciones espec�ficas de Pipeline dentro del Pipeline
 options {
//Mantener artefactos y salida de consola para el # espec�fico de ejecuciones recientes del Pipeline.
buildDiscarder(logRotator(numToKeepStr: '3'))
//No permitir ejecuciones concurrentes de Pipeline
disableConcurrentBuilds()
 }
 //Una secci�n que define las herramientas para �autoinstalar� y poner en la PATH
 tools {
 jdk 'JDK8_Centos' //Preinstalada en la Configuraci�n del Master
 gradle 'Gradle4.5_Centos' //Preinstalada en la Configuraci�n del Master
 }
 //Aqu� comienzan los �items� del Pipeline
 stages{
 stage('Checkout') {
 steps{
 echo "------------>Checkout<------------"
	checkout([$class: 'GitSCM', branches: [[name: '*/master']],
	doGenerateSu4bmoduleConfigurations: false, extensions: [], gitTool:
	'Git_Centos', submoduleCfg: [], userRemoteConfigs: [[credentialsId:
	'GitHub_andresftorres', url:
	'https://github.com/andresftorres/CeibaEstacionamiento']]])
 }
 }
 stage('Unit Tests') {
	steps{
		echo "------------>Unit Tests<------------"
		sh 'gradle --b ./build.gradle test'
	}
 }
 stage('Integration Tests') {
 steps {
 echo "------------>Integration Tests<------------"
 }
 }
 stage('Static Code Analysis') {
		steps{
		echo '------------>An�lisis de c�digo est�tico<------------'
		withSonarQubeEnv('Sonar') {
		sh "${tool name: 'SonarScanner',type:'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner"
}
}
}
 stage('Build') {
	steps {
		echo "------------>Build<------------"
		//Construir sin tarea test que se ejecut� previamente
		sh 'gradle --b ./build.gradle build -x test'
	}
}
 }
 post {
 always {
 echo 'This will always run'
 }
 success {
	echo 'This will run only if successful'
	junit '**/build/test-results/test/*.xml'
 }
 failure {
	echo 'This will run only if failed'
	mail (to: 'andres.torres@ceiba.com.co',subject: 
		"Failed Pipeline:${currentBuild.fullDisplayName}",
	body: "Something is wrong with ${env.BUILD_URL}")
 }
 unstable {
 echo 'This will run only if the run was marked as unstable'
 }
 changed {
 echo 'This will run only if the state of the Pipeline has changed'
 echo 'For example, if the Pipeline was previously failing but is now successful'
 }
 }
}