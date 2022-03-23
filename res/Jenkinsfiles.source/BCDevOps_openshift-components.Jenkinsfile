pipeline {
    agent none
    options {
        disableResume()
    }
    stages {
        stage('Build') {
            agent { label 'build' }
            steps {
                script {
                    def filesInThisCommitAsString = sh(script:"git diff --name-only HEAD~1..HEAD | grep '^.jenkins/' || echo -n ''", returnStatus: false, returnStdout: true).trim()
                    def hasChangesInPath = (filesInThisCommitAsString.length() > 0)
                    echo "${filesInThisCommitAsString}"
                    if (!currentBuild.rawBuild.getCauses()[0].toString().contains('UserIdCause') && !hasChangesInPath){
                        currentBuild.rawBuild.delete()
                        error("No changes detected in the path ('^.jenkins/')")
                    }
                }
                echo "Aborting all running jobs ..."
                script {
                    abortAllPreviousBuildInProgress(currentBuild)
                }
                echo "BRANCH_NAME:${env.BRANCH_NAME}\nCHANGE_ID:${env.CHANGE_ID}\nCHANGE_TARGET:${env.CHANGE_TARGET}"
                echo "Building ..."
                sh ".jenkins/pipeline-cli build --pr=${CHANGE_ID} --config=.jenkins/openshift/config.groovy"
            }
        }
        stage('Deploy (DEV)') {
            agent { label 'deploy' }
            steps {
                echo "Deploying ..."
                sh ".jenkins/pipeline-cli deploy --pr=${CHANGE_ID} --config=.jenkins/openshift/config.groovy --env=dev"
            }
        }
        stage('Deploy (PROD)') {
            agent { label 'deploy' }
            input {
                message "Should we continue with deployment to PROD?"
                ok "Yes!"
            }
            steps {
                echo "Deploying ..."
                sh ".jenkins/pipeline-cli deploy --pr=${CHANGE_ID} --config=.jenkins/openshift/config.groovy --env=prod"
            }
        }
        stage('Acceptance') {
            agent { label 'deploy' }
            input {
                message "Should we continue with cleanup?"
                ok "Yes!"
            }
            steps {
                echo "Cleaning ..."
                sh ".jenkins/pipeline-cli cleanup --pr=${CHANGE_ID} --config=.jenkins/openshift/config.groovy"
            }
        }
    }
}