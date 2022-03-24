pipeline {
    agent any
    //agent { docker 'php' }
    parameters {
        string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')
    }

    //environment {
       //SAUCE_ACCESS = credentials('sauce-lab-dev')
    //}

    stages {
        stage('Example') {
            steps {
                echo "Hello ${params.PERSON}"
            }
        }
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'php --version'
                // Run Composer
                //sh 'composer install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                // Run the tests
                //sh "vendor/bin/phpunit"
            }
        }
        stage('SonarQube analysis') {
            steps {
                echo 'SonarQube analysis..'
                // requires SonarQube Scanner 2.8+
                def scannerHome = tool 'SonarQube Scanner 2.8';
                withSonarQubeEnv('My SonarQube Server') {
                  sh "${scannerHome}/bin/sonar-scanner"
                }
            }
         }
        stage('Deploy - Staging') {
            when {
                branch 'develop'
                //currentBuild.result == 'SUCCESS'
            }
            steps {
                echo 'Deploying to staging....'
            }
        }

        stage('Sanity check') {
            steps {
                echo 'Sanity check....'
                //input "Does the staging environment look ok?"
            }
        }

        stage('Deploy - Production') {
            when {
                branch 'master'
                //currentBuild.result == 'SUCCESS'
            }
            steps {
                echo 'Deploying to Production....'

                retry(3) {
                    //sh './flakey-deploy.sh'
                    echo 'retry Deploying to Production....'
                }

                timeout(time: 3, unit: 'MINUTES') {
                    //sh './slow-process.sh'
                    echo 'Deploying. timeout'
                }
            }
        }
    }

    post {
        always {
            echo 'This will always run'
            //deleteDir() /* clean up our workspace */
        }
        success {
            echo 'This will run only if successful'
        }
        failure {
            echo 'This will run only if failed'
            mail to: 'moukafih@live.nl',
                         subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
                         body: "Something is wrong with ${env.BUILD_URL}"
        }
        unstable {
            echo 'This will run only if the run was marked as unstable'
        }
        changed {
            echo 'This will run only if the state of the Pipeline has changed'
            echo 'For example, the Pipeline was previously failing but is now successful'
        }
    }
}