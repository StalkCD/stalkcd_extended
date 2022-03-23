#!groovy

final DEFAULT_PIPELINE_ENV = 'pull_request'

final PIPELINE_PARAMETERS = '''
DESIRED_NODE_NAME = 'docker'
GIT_CREDENTIALS_ID = 'github'
PIPELINE_VERSION = 'post-to-firebase-monitor'
PROJECT_NAME = 'automation-apimanager-ui'
PLATFORM = 'node'
BROWSERS = 'chrome'
SAUCELABS_CREDENTIALS_ID = 'saucelabs'
UI_TEST_TIMEOUT = '40'
SETUP_TIMEOUT = '10'
JUNIT_REPORT_PATH = 'testresults/junit/*.xml'
HTML_REPORT_DIR = 'testresults/htmlreport'
HTML_REPORT_FILE = 'report.html'
HTML_REPORT_NAME = 'HTML Report'
SKIP_STAGES = 'unit-test'

environments {
    pull_request {
        ENVS = 'qa'
        ENV_AGENT_VERSION = '1.6.0-mule-3.x'
        GIT_BRANCH = 'qa'
        MONITOR_ENV = 'qa'
        MONITOR_URL = 'https://automation-builds.firebaseio.com'
    }

    prod {
        ENVS = 'prod'
        UI_TEST_TIMEOUT = '50'
        GIT_BRANCH = 'prod'
    }
    qa {
        ENVS = 'qa'
        GIT_BRANCH = 'qa'
        ENV_AGENT_VERSION = '1.6.0-mule-3.x'
        MONITOR_ENV = 'qa'
        MONITOR_URL = 'https://automation-builds.firebaseio.com'
    }
    stg {
        ENVS = 'stg'
        GIT_BRANCH = 'stg'
        ENV_AGENT_VERSION = '1.6.0-mule-3.x'
    }
    onprem {
        ENVS = 'onprem'
        GIT_BRANCH = 'onprem'
        BASE_URL = 'https://1-5-1-ga-3nodes-1230463418.us-east-1.elb.amazonaws.com'
    }
}
'''

def pipelineEnv = env.PIPELINE_ENV ?: DEFAULT_PIPELINE_ENV,
    config = new ConfigSlurper(pipelineEnv).parse(PIPELINE_PARAMETERS).toProperties()

properties([
  parameters([
    string(defaultValue: 'pull_request', description: 'Pipeline Environment Config key', name: 'PIPELINE_ENV')
  ])
])

node(config.DESIRED_NODE_NAME) {
    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: config.GIT_CREDENTIALS_ID, passwordVariable: 'GITHUB_PASS', usernameVariable: 'GITHUB_USER']]) {
        git(credentialsId: config.GIT_CREDENTIALS_ID, branch: config.PIPELINE_VERSION, url: 'git@github.com:mulesoft/automation-jenkins-pipeline.git')

        load('pipeline.groovy').execute(config)
    }
}
