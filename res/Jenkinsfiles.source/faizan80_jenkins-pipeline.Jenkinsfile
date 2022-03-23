#!/usr/bin/env groovy

def buildmessage = "Building .. ${env.BUILD_ID}"

pipeline {
    agent none
    //setting environment variable, to be availeble through jenkins file
    environment {
        buildmessage_env = "setting environment"
    }



    parameters {
        string(name: 'Greeting', defaultValue: 'Hello', description: 'How should I greet the world?')
    }


    stages {
        
        stage('Build') {
            agent any
            environment {
                l_env_var = "setting local environment variable for build stage only"
            }
            steps {
                echo "${params.Greeting} from pipeline"
                echo "${env.buildmessage_env}"
                echo "${buildmessage}"
                echo "${env.l_env_var}"
                echo "archiving artifacts, archiveArtifacts artifacts: '**' "

                stash includes: 'README.md', name: 'wiki'
            }
            post {
                always {
                    echo "Always run junit reports"
                }
                success {
                    echo "Build is done successfully and can be tested now (move to tmp repo)"
                }
            }
        }
        //Use of multiple agents in same jenkinsfile
        stage('Test on windows') {
            agent {
                label 'master'
            }
            steps {
                echo "Testing  on windows..  and avoid failingby using inline shell conditional || true "
                echo "collect junit test results using junit step"
            }
        }

        stage('Test on linux') {
            agent {
                label 'testagent'
            }
            steps {
                unstash 'wiki'
                echo "Testing on linux ..  and avoid failingby using inline shell conditional || true "
                echo "collect junit test results using junit step"
            }
        }

        stage('Deploy') {
            agent any
            when {
                expression{
                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                }
            }
            steps {
                echo "Checked the result of previous stages, "
                echo "Deploying .. "
            }
        }
    }
    post {
        always{
            echo "The buid is completed: post step runs always"
        }
        success {
            echo "build is completed successfully: post success"
        }
    }
}
//checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: '5160b6a2-90d4-4d1e-b5b4-21e85c7f6c95', url: 'https://github.com/faizan80/jenkins-pipeline.git']]])
