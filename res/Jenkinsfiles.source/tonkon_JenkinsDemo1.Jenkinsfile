Jenkinsfile (Declarative Pipeline)
pipeline {
    agent { docker { image 'microsoft/nanoserver:sac2016' } }
    stages {
        stage('build') {
            steps {
                bat 'echo "hello world"'
            }
        }
    }
}
