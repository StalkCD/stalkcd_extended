#!groovy​

pipeline {


    agent any 

    stages {

        stage('Compile stage') {
            steps {
                dir('trocmedoc-root') {
                    echo " ===== Compiling from trocmedoc-root ===== "
                    bat 'mvn -DskipTests clean package'
                }

                 
            }
        }

        stage('Testing stage') {
            steps {
                dir('trocmedoc-root') {
                    echo " ===== Testing from trocmedoc-root ===== "
                    bat 'mvn test'
                }

                
            }
        }

        stage('Deployment stage') {
            steps {
                dir('trocmedoc-root') {
                    bat 'deploy.bat'
                }


                 
                
            }
        }
    }
}