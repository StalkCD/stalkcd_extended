#!groovy​

pipeline {

    // Execute this Pipeline or any of its stages, on any available agent.
    agent any 

    stages {

        stage('Compile stage') {
            steps {
                dir('trocmedoc-root') {
                    echo " ===== Compiling from trocmedoc-root ===== "
                    bat 'mvn -DskipTests clean package'
                }
                /*
                 if (isUnix()) {
                        sh 'mvn -DskipTests clean package'
                 } else {
                        bat 'mvn -DskipTests clean package'
                 }
                 */
                 
            }
        }

        stage('Testing stage') {
            steps {
                dir('trocmedoc-root') {
                    echo " ===== Testing from trocmedoc-root ===== "
                    bat 'mvn test'
                }
                /*
                if (isUnix()) {
                        sh 'mvn test'
                 } else {
                        bat 'mvn test'
                 }
                 */
                
            }
        }

        stage('Deployment stage') {
            steps {
                dir('trocmedoc-root') {
                    bat 'deploy.bat'
                }
                // sh 'mvn deploy'
                /*
                if (isUnix()) {
                        sh './trocmedoc-root/deploy.sh'
                 } else {
                        bat './trocmedoc-root/deploy.bat'
                 }
                 */
                 
                 
                
            }
        }
    }
}