pipeline {
    agent any

    // Set log rotation, timeout and timestamps in the console
    options {
        buildDiscarder(logRotator(numToKeepStr: '20'))
        timestamps()
        timeout(time: 90, unit: 'MINUTES')
    }

    environment {
        ECR_REPOSITORY = '652291809580.dkr.ecr.eu-west-1.amazonaws.com'
        REGION = 'eu-west-1'
    }

    stages {

        stage('Build In Docker') {
            agent {
                docker {
                    image 'maven:3.5-jdk-8-alpine'
                    //TODO this volume should be shared with host container but it is not working. Maven downloads artifacts on every build right now.
                    args '-v $HOME/.m2:/root/.m2:rw,z'
                }
            }
            steps {
                withMaven(mavenSettingsConfig: 'cef-maven') {

                    //Extract pom details for later use
                    script {
                        pom = readMavenPom file: 'pom.xml'
                        POM_VERSION = pom.version
                        POM_GROUP_ID = pom.groupId
                        POM_ARTIFACT_ID = pom.artifactId
                    }

                    //Settings not injected unless MVN_CMD_DIR used... https://wiki.jenkins.io/display/JENKINS/Pipeline+Maven+Plugin#PipelineMavenPlugin-withMavenAndDockerPipeline
                    sh 'export PATH=$MVN_CMD_DIR:$PATH && mvn clean install'

                    dir('target') {
                        stash includes: '*-exec.jar', name: 'targetfiles'
                    }
                }
            }
            post {
                always {
                    junit 'target/surefire-reports/*.xml'
                }
            }
        }

        stage('Create Docker Container') {
            steps {
                script {
                    unstash 'targetfiles'
                    sh 'eval $(aws ecr get-login --no-include-email --region $REGION)'
                    try {
                        sh "aws ecr describe-repositories --region=$REGION --repository-names cef/$POM_ARTIFACT_ID"
                    } catch (error) {
                        sh "aws ecr create-repository --repository-name cef/$POM_ARTIFACT_ID  --region eu-west-1"
                    }
                    docker.withRegistry("https://$ECR_REPOSITORY", "") {
                        def image = docker.build("$ECR_REPOSITORY/cef/$POM_ARTIFACT_ID:$POM_VERSION", "--build-arg JAR_FILE=$POM_ARTIFACT_ID-exec.jar .")
                        image.push()
                        image.push("latest")
                    }
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying....'
                script {
                    env.APP_NAME = "$POM_ARTIFACT_ID"
                    env.APP_IMAGE = image.tag
                    env.KUBERNETES_MASTER = "https://kube-api.cef-nonprod.elsevier.com:443"
                    kubernetesDeploy(
                            credentialsType: 'KubeConfig',
                            kubeConfig: [path: 'k8s/kubeconfig.yaml'],
                            configs: 'k8s/deployment.yaml',
                            enableConfigSubstitution: true
                    ) {
                        env.KUBERNETES_MASTER = "https://kube-api.cef-nonprod.elsevier.com:443"
                    }
                }
            }
        }
    }
}