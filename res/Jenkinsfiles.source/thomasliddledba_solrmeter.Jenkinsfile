pipeline {
    agent {
        label "buildciserver"
    }//End of Agent
    stages {
        stage('Clean Workspace'){
            steps {
                deleteDir()
            }
        }// End Clean Workspace

        stage('Checkout SCM'){
            steps {
                checkout scm
            }
        }// End Checkout SCM

        stage('Build Development'){
            when { branch "develop"}
            steps {
                sh('mvn package')
            }
        }//End Build Development

        stage('Build Production'){
            when { branch "master"}
            steps {
                sh('mvn package')
            }
        }
    }// End of Stages
}// End Pipeline