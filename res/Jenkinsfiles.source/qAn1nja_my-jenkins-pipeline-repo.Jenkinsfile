/* pipeline {
    
    agent none
    parameters {
        string(name:'Greeting' , defaultValue:'Hello' , description:'How should I greet the world?')
    }
    stages {
        stage('Example'){
            agent any
            input{
                message "Should we continue?"
                ok "Yes, we should"
            }
            steps{
                echo "${BUILD_NUMBER}"
                echo "testing integration"
            }
        }
        stage('Build'){
            agent any
            steps{
                echo 'Building'
                echo currentBuild.result
                echo "${env.JOB_NAME}"
                //echo "${AWS_SECRET_KEY_ID}"
            }
        }
        stage('Test on Linux'){
            agent {
                    label 'linux'
            }
            steps{
                echo "using linux agent"
                echo "deployin to DEV tomcat"
                echo "${params.Greeting}"
            }
        }
        stage('Test on Windows'){
            agent {
                label 'windows'
            }
            steps{
                echo "on windows agent"
            }
        }
        stage('DEV Approve'){
            steps{
                echo "Taking approval from DEV"
                timeout(time: 60,unit:'MINUTES'){
                input message: 'Do you want to deplo?', submitter:'admin'
                }
            }
        }
    }
    post{
        success{
            echo 'Good going!'
        }
    }          
    } //end of pipeline */








//----------------------------------- start of Scripted pipeline -------------------------------------------------------
  
// scripted pipeline using docker images
    

node {
    /* Requires the Docker Pipeline plugin to be installed */
    docker.image('node:7-alpine').inside {
        stage('Test') {
            sh 'node --version'
        }
    }
}

//----------------------------------------------------------------------------------------------------------------------
/*
node ('master'){
    stage('Build') {
        echo 'In Build stage'
        echo 'Building....'
    }
    stage('Test') {
        parallel linux: {
            node('linux'){
                checkout scm
                echo 'using linux node'
            }
        },
            windows: {
                node('windows'){
                    echo 'using windows node'
                }
            }
    }
    stage('Deploy') {
        echo 'In Deploy stage'
        echo 'Deploying....'
        echo "Running ${env.BUILD_ID} on ${JENKINS_URL}"
    }
}
*/
 

//----------------------------------- scripted pipeline using docker -------------------------------------------------------

/* 
node ('master'){
    docker.image('node:7-alpine').inside{
        stage('Test'){
            sh 'node --version'
        }
    }
    
} 
*/
