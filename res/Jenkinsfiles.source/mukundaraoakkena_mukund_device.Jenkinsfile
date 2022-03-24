pipeline {
    // necessary if you want any stage to have a 'none' agent
    // the downside is that 'tools' cannot be defined at the top level if agent is none (as it will be ignored)
    // meaning that each stage with an agent must specify required tools
    // https://jenkins.io/doc/book/pipeline/syntax/#tools
    agent none

    environment {
        DOCKER_REGISTRY_LOGIN = credentials('docker_registry_login')
        DOCKER_REGISTRY_URL = 'docker-registry.corp.intelematics.com:5000'
    }

    stages {
        stage ('Initialize') {
            agent any
            steps {
                this.notifyStash()
                sh '''
                    echo "PATH = ${PATH}"
                    echo "M2_HOME = ${M2_HOME}"
                '''
                // add Git Commit ID into environment variables
                script {
                    sh "git rev-parse --short HEAD > .git/commit-id"
                    env.GIT_COMMIT_ID = readFile('.git/commit-id').trim()
                }
                // add maven version into environment variable
                script {
                    // requires pipeline utility plugin
                    // https://jenkins.io/doc/pipeline/steps/pipeline-utility-steps/
                    def mavenPom = readMavenPom file: 'pom.xml'
                    env.MAVEN_ARTIFACT_VERSION = mavenPom.version.trim()
                }
                // add interpolated maven version into environment variable
                script {
                    // get the variable-interpolated artifact version from maven
                    // important here is the -Drevision parameter
                    // https://stackoverflow.com/a/26514030/5215082
                    sh "mvn  -Drevision=${env.GIT_COMMIT_ID} -q -Dexec.executable='echo' -Dexec.args='\${project.version}' --non-recursive org.codehaus.mojo:exec-maven-plugin:1.3.1:exec > .maven-artifact-version"
                    env.MAVEN_ARTIFACT_VERSION = readFile('.maven-artifact-version').trim()
                }
                // print environment variables, for debug
                script {
                    sh "printenv"
                }
            }
        }
        stage ('Build') {
            agent any
            steps {
                sh "./mvnw  -Drevision=${env.GIT_COMMIT_ID} clean compile -DskipTests=true"
            }
        }
        stage ('Package') {
            agent any
            steps {
                sh "./mvnw  -Drevision=${env.GIT_COMMIT_ID} package -Dcheckstyle.skip=true -DskipTests=true -Pdocker-build"
            }
        }
        stage ('Verify') {
            agent any
            steps {
                sh "./mvnw  -Drevision=${env.GIT_COMMIT_ID} verify -Dcheckstyle.skip=true -Pdocker"
            }
            post {
                always {
                    junit '**/target/failsafe-reports/*.xml'
                    junit '**/target/surefire-reports/**/*.xml'
                }
            }
        }

        stage ('Feature-Branch') {
            agent any
            when {
                // One and only one condition is allowed.

                // Only run if the branch matches this Ant-style pattern
                branch "feature/*"
            }
            steps {
                sh 'echo "its a feature branch"'
            }
        }

        stage ('Push Develop Image') {
            agent any
            when {
                // One and only one condition is allowed.

                // Only run if the branch matches this Ant-style pattern
                branch "develop"
            }

            steps {
                sh 'printenv'

                sh 'docker login https://$DOCKER_REGISTRY_URL -u $DOCKER_REGISTRY_LOGIN_USR -p $DOCKER_REGISTRY_LOGIN_PSW'

                sh "docker tag device-gateway-prod-harness $DOCKER_REGISTRY_URL/device-gateway-prod-harness:develop-${env.MAVEN_ARTIFACT_VERSION}"
                sh 'docker tag device-gateway-prod-harness $DOCKER_REGISTRY_URL/device-gateway-prod-harness:develop'

                sh "docker push docker-registry.corp.intelematics.com:5000/device-gateway-prod-harness:develop-${env.MAVEN_ARTIFACT_VERSION}"
                sh 'docker push docker-registry.corp.intelematics.com:5000/device-gateway-prod-harness:develop'


                sh "docker tag device-gateway-test-harness $DOCKER_REGISTRY_URL/device-gateway-test-harness:develop-${env.MAVEN_ARTIFACT_VERSION}"
                sh 'docker tag device-gateway-test-harness $DOCKER_REGISTRY_URL/device-gateway-test-harness:develop'

                sh "docker push docker-registry.corp.intelematics.com:5000/device-gateway-test-harness:develop-${env.MAVEN_ARTIFACT_VERSION}"
                sh 'docker push docker-registry.corp.intelematics.com:5000/device-gateway-test-harness:develop'
            }
        }

        stage('Approve Release') {
            agent none // necessary so that this block-for-human-input does not block other builds

            when {
                branch "develop"
            }

            steps {
                input 'Shall we release this artifact?'
            }
        }

        stage('Perform Release') {
            agent any
            when {
                branch "develop"
            }
            steps {
                // deploy artifacts to Maven Nexus, and tag in Git
                sh "./mvnw  -Drevision=${env.GIT_COMMIT_ID} deploy scm:tag -DskipTests=true -Dcheckstyle.skip=true -Djacoco.skip=true"

                // tag docker image with release-<version>-<git-commit>
                sh "docker tag $DOCKER_REGISTRY_URL/device-gateway-prod-harness:develop-${env.MAVEN_ARTIFACT_VERSION} $DOCKER_REGISTRY_URL/device-gateway-prod-harness:release-${env.MAVEN_ARTIFACT_VERSION}"
                sh "docker tag $DOCKER_REGISTRY_URL/device-gateway-test-harness:develop-${env.MAVEN_ARTIFACT_VERSION} $DOCKER_REGISTRY_URL/device-gateway-test-harness:release-${env.MAVEN_ARTIFACT_VERSION}"

                // tag docker image with release, signalling that this should be deployed to stage
                sh "docker tag $DOCKER_REGISTRY_URL/device-gateway-prod-harness:develop-${env.MAVEN_ARTIFACT_VERSION} $DOCKER_REGISTRY_URL/device-gateway-prod-harness:release"
                sh "docker tag $DOCKER_REGISTRY_URL/device-gateway-test-harness:develop-${env.MAVEN_ARTIFACT_VERSION} $DOCKER_REGISTRY_URL/device-gateway-test-harness:release"

                // push docker tags to remote registry
                sh "docker push $DOCKER_REGISTRY_URL/device-gateway-prod-harness:release-${env.MAVEN_ARTIFACT_VERSION}"
                sh "docker push $DOCKER_REGISTRY_URL/device-gateway-prod-harness:release"
                sh "docker push $DOCKER_REGISTRY_URL/device-gateway-test-harness:release-${env.MAVEN_ARTIFACT_VERSION}"
                sh "docker push $DOCKER_REGISTRY_URL/device-gateway-test-harness:release"
            }
        }
    }

    post {
        failure {
            node('master') {
                script {
                    currentBuild.result = 'FAILED'
                    if (env.BRANCH_NAME == "develop") {
                        step([$class: 'Mailer', notifyEveryUnstableBuild: true, recipients: 'phoenix-dev@intelematics.com', sendToIndividuals: true])
                    }
                }
                this.notifyStash()
            }
        }
        success {
            script {
                currentBuild.result = 'SUCCESS'
            }
            node('master') {
                this.notifyStash()
            }
        }
    }
}

def notifyStash() {
    step([$class: 'StashNotifier'])
}