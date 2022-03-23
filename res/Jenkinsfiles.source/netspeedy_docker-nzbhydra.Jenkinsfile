// https://github.com/jenkinsci/pipeline-model-definition-plugin/wiki/Syntax-Reference
// https://jenkins.io/doc/book/pipeline/syntax/#parallel
// https://jenkins.io/doc/book/pipeline/syntax/#post

pipeline {
    agent { label 'amd64' }
    environment {
        NAME = 'hydra'
        REPO = "netspeedy/${NAME}"
        PRIVATE_REPO = "${PRIVATE_REGISTRY}/${REPO}"
        DOCKER_PRIVATE = credentials('docker-hub-credentials')
        PRIVATE_REGISTRY = 'registry.hub.docker.com'
    }

    stages {
        stage ('Initializing') {
            agent { label 'amd64' }
            steps {

                /* Let's make sure we have the repository cloned to our workspace */
                checkout scm
                pipelineTriggers([ pollSCM('* * * * *') ])

                script {
                    COMMIT = "${env.GIT_COMMIT.substring(0,8)}"

                    if ("${env.GIT_BRANCH}" == "master"){
                        TAG = "latest"
                    }
                    else {
                        TAG = "${env.GIT_BRANCH}"
                    }
                }
                sh 'printenv'
            }
        }
        stage ('Building') {
                    agent { label 'amd64' }
                    steps {
                        sh "docker build -f Dockerfile -t ${REPO}:${COMMIT} ./"
                    }
                    post {
                        success {
                            sh """
                                docker tag "${REPO}":"${COMMIT}" "${PRIVATE_REPO}":"${COMMIT}"
                                docker tag "${REPO}":"${COMMIT}" "${PRIVATE_REPO}":"${TAG}"
                            """
                        }
                    }

        }
        stage ('Run'){
            agent { label 'amd64' }
            steps {
                sh """
                    docker network create "${NAME}"-network-"${COMMIT}"
                    docker run -d --name '${NAME}-${COMMIT}' --network "${NAME}"-network-"${COMMIT}" "${REPO}":"${COMMIT}"
                    docker run -d --name 'jenkins-integration-tests-${COMMIT}' --network "${NAME}"-network-"${COMMIT}" netspeedy/jenkins-integration-tests
                """
                // Get container IDs
                script {
                    CONTAINER_ID = sh(script: "docker ps -qa -f ancestor=${REPO}:${COMMIT}", returnStdout: true).trim()
                }
            }
        }
        stage ('Test'){
            agent { label 'amd64' }
            steps {
                sh """
                    sleep 60
                    docker exec jenkins-integration-tests-${COMMIT} /bin/bash -c 'nc -w 2 -v -z ${NAME}-${COMMIT} 5075'
                """
            }
            post {
                always {
                    sh """
                        docker rm -vf "${NAME}"-"${COMMIT}"
                        docker rm -vf jenkins-integration-tests-"${COMMIT}"
                        docker network rm "${NAME}"-network-"${COMMIT}"
                    """
                }
                success {
                    script {
                        UPLOAD = '1'
                    }
                }
            }
        }
        stage ('Upload'){
            agent { label 'amd64' }
            when {
                expression {
                   UPLOAD == '1'
                }
            }
            steps {
            sh """
               docker login -u "${DOCKER_PRIVATE_USR}" -p "${DOCKER_PRIVATE_PSW}" "${PRIVATE_REGISTRY}"
               docker push "${PRIVATE_REPO}":"${COMMIT}"
               docker push "${PRIVATE_REPO}":"${TAG}"
            """
            }
        }
    }

}
