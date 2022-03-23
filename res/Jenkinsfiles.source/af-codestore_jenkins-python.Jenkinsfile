pipeline {
    agent { docker { image 'python' } }
    stages {
        stage('build') {
            steps {
                sh 'python --version'
                echo 'Hello from python pipeline!'
                echo 'Hello from python pipeline, line 2 has been added!'
            }
        }
    }
}
