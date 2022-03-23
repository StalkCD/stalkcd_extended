@Library('PipelineHelpers') _

pipeline {
    agent any

    environment {
        PIPELINE_NAME = pipelineHelpers.getPipelineName(currentBuild)
        DOCKER_IMAGE = "plugins/example_plugin:${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
    }

    stages {
        stage('Build') {
            steps {
                checkout scm

                script {
                    docker.build(env.DOCKER_IMAGE)
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    dockerHelpers.runInDockerImage(
                        env.DOCKER_IMAGE,
                        "python3 ./unit_tests.py", [
                        ]
                    )

                }
            }
        }

        stage('Push to Dockerhub') {
            steps {
                script {
                    dockerHelpers.pushImageToDefaultRegistry(env.DOCKER_IMAGE, [env.BRANCH_NAME])
                }
            }
        }
        stage('Deploy') {
            steps{
                script{
                    kubeHelpers.deployPlugin(env.DOCKER_IMAGE, env.BRANCH_NAME)
                }
            }
        }
    }




    post {
        always {
            script {
                pipelineHelpers.notifySlack(currentBuild)
            }
        }
    }
}