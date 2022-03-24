#!/usr/bin/env groovy
@Library(['cicd-pipeline-lib']) _

pipeline {
    agent any
    options {
        timestamps()
    }
    stages {
        stage('Compile') {
            steps {
                executeCompileStageSteps()
            }
            post {
                success {
                    executeCompileStagePostSuccessSteps()
                }
                failure {
                    executeCompileStagePostFailureSteps()
                }
            }
        }
        stage('Unit Tests') {
            steps {
                executeUnitTestsStageSteps()
            }
            post {
                success {
                    executeUnitTestsStagePostSuccessSteps()
                }
                failure {
                    executeUnitTestsStagePostFailureSteps()
                }
            }
        }
        stage('Static Analysis') {
            steps {
                executeStaticAnalysisStageSteps()
            }
            post {
                success {
                    executeStaticAnalysisStagePostSuccessSteps()
                }
                failure {
                    executeStaticAnalysisStagePostFailureSteps()
                }
            }
        }
        stage('Static Analysis Quality Gate') {
            agent none
            steps {
                executeStaticAnalysisQualityGateStageSteps()
            }
            post {
                success {
                    executeStaticAnalysisQualityGateStagePostSuccessSteps()
                }
                failure {
                    executeStaticAnalysisQualityGateStagePostFailureSteps()
                }
            }
        }
        stage('Integration Tests') {
            steps {
                executeIntegrationTestsStageSteps()
            }
            post {
                success {
                    executeIntegrationTestsStagePostSuccessSteps()
                }
                failure {
                    executeIntegrationTestsStagePostFailureSteps()
                }
            }
        }
        stage('Publish') {
            failFast true
            parallel {
                stage('Publish Artifact') {
                    steps {
                        executePublishArtifactToArtifactRepositoryStageSteps()
                    }
                    post {
                        success {
                            executePublishArtifactToArtifactRepositoryStagePostSuccessSteps()
                        }
                        failure {
                            executePublishArtifactToArtifactRepositoryStagePostFailureSteps()
                        }
                    }
                }
                stage('Publish Image') {
                    steps {
                        executePublishImageToArtifactRepositoryStageSteps()
                    }
                    post {
                        success {
                            executePublishImageToArtifactRepositoryStagePostSuccessSteps()
                        }
                        failure {
                            executePublishImageToArtifactRepositoryStagePostFailureSteps()
                        }
                    }
                }
            }
        }
        stage('Deploy to Pre-Production') {
            steps {
                executeDeployToPreProductionStageSteps()
            }
            post {
                success {
                    executeDeployToPreProductionStagePostSuccessSteps()
                }
                failure {
                    executeDeployToPreProductionStagePostFailureSteps()
                }
            }
        }
        stage('Deploy to Production?') {
            steps {
                executeDeployToProductionInputStageSteps()
            }
        }
        stage('Deploy to Production') {
            steps {
                executeDeployToProductionStageSteps()
            }
            post {
                success {
                    executeDeployToProductionStagePostSuccessSteps()
                }
                failure {
                    executeDeployToProductionStagePostFailureSteps()
                }
            }
        }
    }
    post {
        success {
            executePostPipelineSuccessSteps()
        }
        aborted {
            executePostPipelineAbortedSteps()
        }
        failure {
            executePostPipelineFailureSteps()
        }
    }
}
