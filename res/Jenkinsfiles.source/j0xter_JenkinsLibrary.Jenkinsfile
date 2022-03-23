@Library('pipeline-library')_

pipeline {
    agent any
    
    stages {
        stage('Test Library') {
            steps {
                cleanWs()
                echo 'Hello World'
                helloWorld {
                    name = 'Ardit'
                }
            }
        }
    }
}
/*@Library('jenkins-pipeline-library')_

pipeline {
    agent any
    
    stages {
        stage('First Stage') {
            steps {
                echo 'Hello World!'
            }
        }
        stage('Use Library') {
            steps {
                HelloWorld 
                {
                    name = 'Ardit'
                }
            }
        }
    }
}*/
