pipeline {
    agent any
    /*
    agent {
        node { label 'my-agent' }
    }
    */

    environment {
        DISABLE_AUTH = 'true'
        DB_ENGINE    = 'sqlite'
    }
    
    parameters {
        string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')
    }
    
    triggers {
        cron('@daily')
        pollSCM('H/2 * * * *')
    }
    
    options {
        buildDiscarder(logRotator(numToKeepStr:'10'))
        disableConcurrentBuilds()
        skipDefaultCheckout(false)
        timeout(time: 5, unit: 'MINUTES')
        /*quietPeriod(600)*/
        timestamps()
    }

    stages {
        stage('Setup') {
            steps {
                sh 'echo "Hello World"'
                echo "Hello ${params.PERSON}"
                sh '''
                    echo "Multiline shell steps"
                    pwd
                '''
                sh 'ls -all'
                nodejs(nodeJSInstallationName: 'NodeJS 8.9.4') {
                    sh 'npm --version'
                    sh 'npm config ls'
                }
                sh 'npm --version'
                sh 'npm config ls'
            }
        }

        stage('Build') {
            steps {
                echo 'Building'

                timeout(time: 3, unit: 'MINUTES') {
                    retry(3) {
                        sh 'echo "Hello World"'
                    }
                }

                sh '''
                    echo "Multiline shell steps works too"
                    ls -all
                '''
            }
        }

        stage('Test') {
            environment {
                DEBUG = 'true'
            }
            steps {
                echo 'Testing'
                sh 'printenv'
            }
        }
        
        stage('Browser Tests') {
            parallel {
                stage('Chrome') {
                    steps {
                        echo "Chrome Tests"
                    }
                }
                stage('Firefox') {
                    steps {
                        echo "Firefox Tests"
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'master'
            }
            steps {
                echo 'Deploying'
            }
        }
    }

    post {
        always {
            echo 'This will always run'
        }

        success {
            echo 'This will run only if successful'
            archiveArtifacts artifacts: '*.MD', fingerprint: true, caseSensitive: false
        }

        failure {
            echo 'This will run only if failed'
        }

        unstable {
            echo 'This will run only if the run was marked as unstable'
        }

        changed {
            echo 'This will run only if the state of the Pipeline has changed'
            echo 'For example, if the Pipeline was previously failing but is now successful'
        }
    }
}
