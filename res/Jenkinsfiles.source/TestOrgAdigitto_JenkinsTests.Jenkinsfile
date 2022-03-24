pipeline {
    /*agent { docker { image 'node:6.3' } }*/
    agent any
    stages {
        stage('Testing Pipeline') {
            steps {
                sh 'echo "This is a demo step of pipeline"'
            }
        }
        stage('Pipeline Utility Tester') {
            steps {
                sh 'echo "Reading config.yml file"'
                script{datas = readYaml (file: 'config.yml') }
                echo datas.config.toString()
            }    
        }
    
    }
}
