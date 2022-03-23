pipeline {
    agent none
    stages {
        stage('master copy project to /workDir/deploy_temp') {
            agent {
                docker {
                     image 'alpine:latest'
                     args '-v /workDir/deploy_temp:/workDir/deploy_temp'
                }
            }

             when {
                branch 'master'
            }

            steps {
                    sh 'cd /workDir/deploy_temp;rm -rf app;mkdir app;'
                    sh 'cp -r ./* /workDir/deploy_temp/app/'
                }
        }
        stage('test copy project to /workDir/deploy_temp') {
            agent {
                docker {
                     image 'alpine:latest'
                     args '-v /workDir/deploy_temp:/workDir/deploy_temp'
                }
            }

            when {
                branch 'test'
            }

            steps {
                    sh 'cd /workDir/deploy_temp;rm -rf app_test;mkdir app_test;'
                    sh 'cp -r ./* /workDir/deploy_temp/app_test/'
            }
        }
        stage('deploy') {
            agent {
                docker {
                     image 'pivotaldata/concourse-ssh:latest'
                     args '--privileged=true -v /home/git/.ssh:/root/.ssh'
                }
            }
             when {
                branch 'master'
            }
            steps {
                sh 'chmod 777 ./deploy.sh;./deploy.sh &'
            }
        }
        stage('deploy test') {
            agent {
                docker {
                     image 'pivotaldata/concourse-ssh:latest'
                     args '--privileged=true -v /home/git/.ssh:/root/.ssh'
                }
            }
             when {
                branch 'test'
            }
            steps {
                sh 'chmod 777 ./deploy_test.sh;./deploy_test.sh &'
            }
        }
    }
    post {
            failure {
                mail to: 'mail@walktotop.com',
                     subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
                     body: "Something is wrong with ${env.BUILD_URL}"
            }
        }
}
