pipeline {
    agent any
    stages {
        stage('Build against master branch') {
            when {
                branch 'master'
            }
            steps {
                echo 'Hello World'
                sh ''' docker run -d -p 8080 pipeline/httpd '''
            }
        }
        stage('Build against PullRequest branch') {
            when {
                branch 'PullRequest'
            }
            steps {
                echo 'Deploying'
                sh ''' docker build -t pipeline/httpd . '''
				sh ''' docker run -d -p 8080 pipeline/httpd '''
				sh ''' docker ps  | grep -v grep | grep httpd '''
            }
        }
		stage('Build against Intergration branch') {
            when {
                branch 'Intergration'
            }
            steps {
                echo 'Deploying'
                sh ''' docker build -t pipeline/httpd . '''
            }
        }
    }
}

