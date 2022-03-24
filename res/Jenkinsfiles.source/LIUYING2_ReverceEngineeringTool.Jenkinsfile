pipeline {
    //Dont change this. This agent definition keeps the jobs using up nodes for management.
    agent none

    //defining common variables.
    environment{
    GITHUB_URL = "https://github.com/fastretailing/AR2-BI-Arch-Software.git"
    PROJECT_NAME = "AR2-BI-Arch-Software"
    SLACK_CHANNEL = "#bi_dwh"
    }

    //Tools used by the pipeline go here
    tools{
            gradle 'gradle 4.1' 
            jdk 'javajdk'
    }

    stages {
        stage ('Initialize') {
        agent { label 'workforce-jp' }
            steps {
                sh 'echo "Hello"'
                sh "printenv"
            }
        }


        stage('Scanning') {
        agent { label 'workforce-jp' }
        when{
            anyOf { branch 'master'; branch 'hotfix' ; branch 'release' ; branch 'develop'}
        }
            steps {
                git branch: '$BRANCH_NAME', credentialsId: '1b037f66-41d0-4824-a6a2-eaea1d6939f0', url: "${GITHUB_URL}"
                

                withSonarQubeEnv('sonarqube') {
                // requires SonarQube Scanner for Gradle 2.1+
                // It's important to add --info because of SONARJNKNS-281
                sh './gradlew --info sonarqube -Dsonar.projectName="${PROJECT_NAME}" -Dsonar.branch="$BRANCH_NAME" -Dsonar.projectKey="${PROJECT_NAME}"'
                }
                cleanWs()
            }
        }

        stage("Quality Gate"){
        agent { label 'workforce-jp' }
        when{
            anyOf { branch 'master'; branch 'hotfix' ; branch 'release' ; branch 'develop'}
        }
            steps{
                script {
                    timeout(time: 1, unit: 'HOURS') { // Just in case something goes wrong, pipeline will be killed after a timeout
                    def qg = waitForQualityGate() // Reuse taskId previously collected by withSonarQubeEnv
                        if (qg.status != 'OK') {
                            echo "[FAILURE] Failed to build"
                            currentBuild.result = 'FAILURE'
                            exit
                        }
                    }
                }
            }   
        }

        stage('Building') {
        agent { label 'workforce-jp' }
            steps {
                git branch: '$BRANCH_NAME', credentialsId: '1b037f66-41d0-4824-a6a2-eaea1d6939f0', url: "${GITHUB_URL}"
                

                sh './gradlew --info clean build test bootRepackage'
            }
        }

        stage('Packaging') {
        agent{ label 'workforce-jp'}
        when{
            anyOf { branch 'master'; branch 'hotfix' ; branch 'release' ; branch 'develop'}
        }
            steps {
                echo 'Packaging..'

            }
        }

        
        stage('Deploying to production environment') {
        agent { label 'workforce-jp' }
        when{
            branch 'master'
        }
            steps {
                sh 'echo "deploying to production"'
            }
        }


        stage('Deploying to staging environment') {
        agent { label 'workforce-jp' }
        when{
            anyOf { branch 'master'; branch 'hotfix' }
        }
            steps {
                sh 'echo "deploying to staging"'
            }
        }


        stage('Deploying to release environment') {
        agent { label 'workforce-jp' }
        when{
        branch 'release'
        }
            steps {
                sh 'echo "deploying to release"'
            }
        }


        stage('Deploying to development environment') {
        agent { label 'workforce-jp' }
        when{
        branch 'develop'
        }
            steps{
                echo "uploading to S3"
            }
        }
    }
    post{
        success{
        slackSend baseUrl: 'https://accenture-ariakepj.slack.com/services/hooks/jenkins-ci/', channel: "${SLACK_CHANNEL}", color: '#00FF00', message: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}] ${env.BRANCH_NAME}' (<${env.BUILD_URL}|Open>)", token: 'P48phroMfwHXmETeILiGEWaP'
        }
        unstable{
        slackSend baseUrl: 'https://accenture-ariakepj.slack.com/services/hooks/jenkins-ci/', channel: "${SLACK_CHANNEL}", color: '#FFFF00', message: "UNSTABLE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}] ${env.BRANCH_NAME}' (<${env.BUILD_URL}|Open>)", token: 'P48phroMfwHXmETeILiGEWaP'
        }
        failure{
        slackSend baseUrl: 'https://accenture-ariakepj.slack.com/services/hooks/jenkins-ci/', channel: "${SLACK_CHANNEL}", color: '#FF0000', message: "FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}] ${env.BRANCH_NAME}' (<${env.BUILD_URL}|Open>)", token: 'P48phroMfwHXmETeILiGEWaP'
        }
    }
    options {
        buildDiscarder(logRotator(numToKeepStr:'10'))
        timeout(time: 60, unit: 'MINUTES')
    }
}