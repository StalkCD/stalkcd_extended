pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                sh 'rm -rf maggie-'
                sh 'git clone https://github.com/prakashkumar14258/maggie-.git '
                sh 'docker build -t prakashkumar12345/pipeline:${BUILD_NUMBER} -f Dockerfile .'
                sh 'docker push prakashkumar12345/pipeline:${BUILD_NUMBER}'
                sh 'ls'
              
                 
            }
        }
    }
}
