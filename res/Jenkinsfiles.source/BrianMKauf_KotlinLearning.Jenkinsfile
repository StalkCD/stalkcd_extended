pipeline {
  agent none
  stages {
    stage('Lower environment build/test/deploy') {
    agent any
    stages {
    stage('Build') {
      steps {
        wrapCommands(
                        {
                        sh '''./gradlew clean assemble'''
                        archiveArtifacts artifacts: '**/build/libs/**/*.jar', fingerprint: true},
  "http://something.cfapps.io/projects/628379d9-20aa-49f0-861c-fec2f2a71d4d/status"
)
      }
    }
    stage('Test') {
      steps {
      echo 'com.example.warehouse_kotlin.testing'
      }
    }
    stage('E2E') {
      steps {
        echo 'E2Eing'
      }
    }
    stage('DeployDev') {
      steps {
                wrapCommands(
                {
                echo 'Deploying to Dev'
                //pushToCloudFoundry cloudSpace: 'playground', credentialsId: '6ea07003-dece-40c1-98fc-a5818957fca2', organization: 'pivot-acourter', target: 'api.run.pcfbeta.io'
                },
                "http://something.cfapps.io/projects/0a389362-c1da-4c6d-821b-6ca396d97f2a/status"
)
      }
    }
    }
    }
    stage('Deploy to Higher environments') {
    stages {
        stage('RequestDeployStaging') {
          agent none
          steps {
            script {
            env.DEPLOY_TO_STAGING =  input(message: 'Deploy to Staging?', ok: 'Confirm', parameters: [booleanParam(description: 'Deploy this build?',name: 'Yes?')])
          }
        }
        }
        stage('DeployStaging') {
            agent any
            when {
              environment name: 'DEPLOY_TO_STAGING', value: 'true'
            }
            steps {
            copyArtifacts filter: '**/build/libs/*.jar', fingerprintArtifacts: true, projectName: 'Pipeline', selector: specific(env.BUILD_NUMBER)
              echo 'Deploying to Staging'
            }
        }
        stage('RequestDeployProduction') {
          agent none
          steps {
                  script {
      env.DEPLOY_TO_PRODUCTION = input(message: 'Deploy to Production?', ok: 'Confirm', parameters: [booleanParam(description: 'Deploy this build?',name: 'Yes?')])
          }
          }
        }
        stage('DeployProduction') {
            agent any
            when {
              environment name: 'DEPLOY_TO_PRODUCTION', value: 'true'
            }
            steps {
            copyArtifacts filter: '**/build/libs/*.jar', fingerprintArtifacts: true, projectName: 'Pipeline', selector: specific(env.BUILD_NUMBER)
              sh '''ls'''
              sh '''ls build/libs'''
              echo 'Deploying to Production'
            }
        }
  }
  }
}
}

def wrapCommands(commands, jobUrl) {
        postToBuildMonitor("STARTED", "SUCCESS", jobUrl)
        script {
            currentBuild.result = 'SUCCESS'
            try {
              commands.call()
            } catch (e) {
               currentBuild.result = 'FAIL'
               throw e
            } finally {
               postToBuildMonitor("FINALIZED", currentBuild.result, jobUrl)
            }
        }
}

def postToBuildMonitor(phase, isSuccessful, jobUrl) {
  sh(script: "curl --retry 5 -X POST -H \"Content-Type: application/json\" -d '{ \"build\": { \"full_url\": \"\", \"number\": ${env.BUILD_NUMBER}, \"phase\": \"${phase}\", \"status\": \"${isSuccessful}\" }}' ${jobUrl}")
}
