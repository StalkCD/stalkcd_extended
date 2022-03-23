pipeline {
    agent none
    stages {
        stage('Clone git repo') {
            agent any
            steps {
                sh 'rm -rf GradleHometask/'
                sh 'git clone https://github.com/mykolabakhovskuy/GradleHometask.git'
            }
        }
        stage('Make build') {
            agent {
                docker { 
                    image 'gradle:alpine'
                     customWorkspace 'workspace/testPipeline/GradleHometask'
                }
            } 
            steps{
                sh 'gradle clean build'
                sh 'gradle ZipSubProject:createzip'
                
            }
        }
        stage('Push to Artifactory'){
            agent any
            steps{
                 script {
                     def server = Artifactory.server('test')
                     def buildInfo = Artifactory.newBuildInfo()
                   //  def rtGradle = Artifactory.newGradleBuild()
                     server.publishBuildInfo(buildInfo)
                 }
            }
        }
    }
}
