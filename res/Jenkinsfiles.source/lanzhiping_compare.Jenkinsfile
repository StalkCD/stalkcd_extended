pipeline {
    agent any

    stages {
        stage("Build") {
            agent {
                docker "node:8"
            }
            steps {
                sh "npm install"
                sh "npm run test"
                sh "npm run build"
            }
        }

        stage("Deploy:Dev") {
            agent {
                docker "node:8"
            }
            steps {
                sh "echo 'Deploy to local environment'"
                sh "npm run deploy"
            }
        }
    }

    post {
        success {
            echo "Pipeline succeeeded!"
        }
        failure {
            echo "Pipeline failed"
        }
    }
}

/*
    docker run --rm --add-host="github.build.ge.com:10.152.32.50" -p 8080:8080 -p 22:22 -u root -v jenkins-data:/var/jenkins_home  -v /var/run/docker.sock:/var/run/docker.sock   -v "$HOME":/home jenkinsci/blueocean
*/