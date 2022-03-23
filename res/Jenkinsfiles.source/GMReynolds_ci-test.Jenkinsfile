//Creating pipeline
pipeline {
//creating an agent using docter image of python
    agent { docker { image 'python:3.5.1' } }
    //creating stages for pipeline
    stages {
        //declaring the build stage
        stage('build') {
            //Steps needed to build
            steps {
                //get python version and print out - should match image
                sh 'python --version'
            }
        }
    }
}

