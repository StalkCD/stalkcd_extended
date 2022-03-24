// Pipeline definition
pipeline {

    // This pipe is executed within any agent
    agent any

    stages {
        
        stage('Checkout'){
            steps {
                git url: 'https://github.com/jneilaglez/hello-world.git'
            }
            
        }

        // It needs to refactor, cause if the computer
        // has not installed virtual env the pipeline 
        // must fail
        stage('Virtualenv'){
            steps {
                echo 'Creating autonomy virtualenv'
                sh 'virtualenv autonomy-env -p python3' 
            }

        }

        stage('Requirements'){
            steps {
                echo 'Installing develop environment'
                sh 'source autonomy-env/bin/activate && python --version'
            }
        }
        
        stage('Testing'){
            steps {
                echo 'Executing tests'
                sh 'source autonomy-env/bin/activate && python --version && make install-dev'
            }

        }

    }

}
