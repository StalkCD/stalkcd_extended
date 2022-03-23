pipeline {
 New_branch1
    agent any

    stages {
        stage('Test') {
            steps {
                /*  returns non-zero on test failures,
                * using  to allow the Pipeline to continue nonetheless
                */
                sh 'make check || true' 
                junit '**/target/*.xml' 

New_branch
    agent any 
    stages {
        stage('Build') { 
            steps {
                echo 'test'
            }
        }
        stage('Test') { 
            steps {
                echo 'printt'
            }
        }
        stage('Deploy') { 
            steps {
                echo 'jenkin'

    agent any

    stages {
      Azeem_branch
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
        stage('Deploy') {
            when {
              expression {
                currentBuild.result == null || currentBuild.result == 'SUCCESS' 
              }
            }
            steps {
                sh 'make publish'
master
master
master
            }
        }
    }
}
