
// #!/usr/bin/env groovy

// All valid Declarative Pipelines must be enclosed within a pipeline block.
// For syntax for pipeline components: see https://jenkins.io/doc/book/pipeline/syntax
pipeline {

    //    The agent directive, which is required, instructs Jenkins to allocate an executor and workspace for
    //    the Pipeline. Without an agent directive, not only is the Declarative Pipeline not valid, it would
    //    not be capable of doing any work! By default the agent directive ensures that the source repository
    //    is checked out and made available for steps in the subsequent stages`
    agent any
    environment {
        DOCKER = credentials('DOCKER-HUB')
    }

    // stages {} can have multiple stages. (Build, Test, Deploy, Etc.) This we can define according to our pipeline
    // design.
    // Stages take a sequential flow.
    // steps {} Defines what to be executed in each stage.

    // This is a declarative pipeline.
    // If we used a scripted pipeline, we need to use a node.
    // Node is what brings an executor and workspace for the particular pipeline.

    stages {
        stage('Build') {
            steps {
                echo '=== Build Started '
                sh './mvnw clean install package -q'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh './mvnw test -q'
            }
        }
        stage('Build and Deploy Docker Image') {
            steps {
                 sh 'echo  $DOCKER_USR && echo $DOCKER_PSW'
                sh 'docker login -u $DOCKER_USR -p $DOCKER_PSW'
                sh 'docker build -t benabs/test-sping-boot .'
                sh 'docker push  benabs/test-sping-boot'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
