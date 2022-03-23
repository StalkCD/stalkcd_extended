pipeline {
    //agent any
    agent {
        docker {
            image 'node'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Start') {
            steps {
                echo '___________ Starting pipeline ___________'
            }
        }

        stage('Install Packages') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build Application') {
            steps {
                sh 'npm run build'
                echo '___________ Build complete ___________'
            }
        }
    }
}