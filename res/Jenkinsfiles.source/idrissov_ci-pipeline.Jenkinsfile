pipeline {
    agent none
    triggers {
        pollSCM('H */4 * * 1-5')
    }
    options {
        skipDefaultCheckout(true)
    }

    stages {
        // stage('Example') {
        //     input {
        //         message "Should we continue?"
        //         ok "Yes, we should."
        //         submitter "alice,bob"
        //         parameters {
        //             string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')
        //         }
        //     }
        //     steps {
        //         echo "Hello, ${PERSON}, nice to meet you."
        //     }
        // }
        stage('Update from SCM') {
            agent any
            steps {

                checkout([$class: 'GitSCM', branches: [[name: '*/master']],
                          userRemoteConfigs: [[url: 'https://github.com/idrissov/ci-pipeline.git']]])


            }

        }
        stage('Example Build') {
            agent {
                docker {
                    image 'maven:3.5.0'
                    args '-v maven-repo:/root/.m2 -v /home/serik/D/serik/projects/jenkins-dood/jenkins_home/workspace/test:/usr/src/mymaven -w /usr/src/mymaven '
                }
            }
            steps {
                sh 'mvn clean install'

            }

        }
        stage('Build docker file') {
            agent any
            steps {
                // sh 'docker container ls'
                // sh 'docker inspect --format "{{title .NetworkSettings.IPAddress}}" inner'
                sh 'docker build -t projet .'
            }
        }
        stage('Run docker') {
            agent any
            steps {
                sh 'docker container run -d -p 8082:8080 projet'
            }
        }
        stage('Integration tests') {
            agent any
            steps {
                sh 'docker container ls'
                sh 'docker inspect --format "{{title .ContainerConfig.Hostname}}" projet'
                //sh 'dockerhost=$(docker inspect --format "{{title .ContainerConfig.Hostname}}" projet) && curl http://$dockerhost:8082'


            }
            post {
                always {
                    sh 'docker rm \$(docker stop \$(docker container ls -q -n1))'
                }
            }
        }

    }
    post {
        success {
            mail subject:'Jenkins Build Success ' + currentBuild.displayName , to:'serik_idrissov@epam.com', from:'aggredi@mail.ru', body:currentBuild.absoluteUrl
        }
        failure {
            mail subject:'Jenkins Build Success ' + currentBuild.displayName , to:'serik_idrissov@epam.com', from:'aggredi@mail.ru', body:currentBuild.absoluteUrl
        }
    }
}