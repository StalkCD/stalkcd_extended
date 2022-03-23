import hudson.triggers.TimerTrigger;

// Checks whether the current build was triggered by cron job.
// We need this to check, whether we want to trigger a deployment
// step for a stable nightly build.
def isTriggeredByCron()
{
    for (cause in currentBuild.rawBuild.getCauses())
    {
        if (cause instanceof TimerTrigger.TimerTriggerCause)
            return "cron"

        return "other"
    }
}

// Start the pipeline.
pipeline {
    agent any
    triggers {  // Additional trigger to build nightly on master.
        cron('H * * * *')
    }
    environment {  // Prepare environment for build.
        BUILD_BRANCH_ID = "${GIT_COMMIT ?: 'master'}"
        BUILD_TRIGGER = "${isTriggeredByCron()}"  // TODO isTriggeredByCron
    }
    stages { // TODO(rrahn): Check if really needed.
        stage ('Configure') {  // Do we need this?
            steps {
                script {
                    echo "The pushed branch: ${BRANCH_NAME}"
                    echo "The build branch: ${env.BUILD_BRANCH_ID}"
                    echo "Git commit hash: ${env.GIT_COMMIT}"
                    echo "Git commit branch: ${env.GIT_BRANCH}"
                }
            }
        }
        stage ('Test') { // Tests all tests in parallel.
            parallel {
                stage ('unix unit') {
                    steps {
                        echo "TODO: Test unit tests, when nightly."
                        echo "TODO: Test unit tests, when release."
                        // build job: 'pipeline_unit_tests_unix', parameters: [string(name: 'BUILD_BRANCH_ID', value: "${env.BUILD_BRANCH_ID}")], quietPeriod: 0
                    }
                }
                stage ('doc') {
                    steps {
                        echo "TODO: Perform doc tests."
                    }
                }
                stage ('memory') {
                    steps {
                        echo "TODO: Perform memory tests."
                    }
                }
                stage ('coverage') {
                    steps {
                        echo "TODO: Perform coverage tests."
                    }
                }
                stage ('performance') {
                    steps {
                        echo "TODO: Perform performance tests."
                    }
                }
            }
        }
        stage ('Deploy') { // conditional deploy step.
            agent none
            when { // only execute if nightly build and on 'master' branch or if seqan was tagged with a new release.
                beforeAgent true
                anyOf {
                    allOf {
                        branch 'master'
                        environment name: 'BUILD_TRIGGER', value: 'cron'
                    }
                    tag "seqan-*"
                }
            }
            stages { // Execute multiple stages in sequential order.
                stage ('package nightly stable') {
                    when {
                        beforeAgent true
                        branch 'master'
                        environment name: 'BUILD_TRIGGER', value: 'cron'
                    }
                    steps {
                        script {
                            echo "TODO: deploy nightly stable."
                        }
                    }
                }
                stage ('package release') {
                    when {
                        beforeAgent true
                        tag "seqan-*"
                    }
                    steps {
                        script {
                            echo "TODOL deploy release."
                        }
                    }
                }
                stage ('acceptance test') {
                    steps {
                        echo "TODO: perform acceptance test"
                    }
                }
            }
        }
    }
}
