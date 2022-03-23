#!groovy

// loading library for common tasks
@Library(['github.com/SchweizerischeBundesbahnen/jenkins-pipeline-helper@master', 'wzu-pipeline-helper']) _

String cron_string = BRANCH_NAME == "develop" ? "@midnight" : ""

pipeline {
    agent { label 'nodejs' }
    parameters {
        string(name: 'OC_ENV', defaultValue: 'dev', description: 'Deploy to this OpenShift environment')
    }
    triggers { cron(cron_string) }
    tools {
        maven 'Apache Maven 3.3'
        jdk 'OpenJDK 1.8 64-Bit'
    }

    stages {
        stage('Unit Tests') {
            steps {
                sh 'mvn -B clean test'
            }
        }

        stage('When on develop, deploy snapshot, analyze for sonar and trigger OpenShift') {
            when {
                branch 'develop'
            }
            steps {
                sh 'mvn -B clean deploy'
                withSonarQubeEnv('Sonar SBB CFF FFS AG') {
                    sh 'mvn -B org.jacoco:jacoco-maven-plugin:prepare-agent test'
                    // the argument -Dsonar.branch=$BRANCH_NAME' is optional
                    sh 'mvn -B sonar:sonar -Dsonar.branch=$BRANCH_NAME'
                }
                
                script {
                    def pom = readMavenPom()
                    sh "cd docker && ./executeBuildRepo.sh ${params.OC_ENV} ${pom.version}"
                }
            }
        }

        stage('When on master, we create a release & deploy') {
            when {
                branch 'master'
            }
            steps {
                script {
                    def releasedPom = releaseMvn()
                    sh "cd docker && ./executeBuildRepo.sh prod ${releasedPom.version}"
                }
            }
        }
    }
}