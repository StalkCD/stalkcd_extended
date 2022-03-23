@Library('pipeline-library')_

pipeline {

  agent any

  environment {
    RUN_RESET_PLATFORM_STEP  = false
    RUN_TESTS_STEP           = false
    RUN_SONAR_STEP           = false
    RUN_BUILD_STEP           = false
    RUN_PRODUCTION_PACKAGING = false
    HCS_PACKAGING            = false
    RUN_DEPLOYMENT_SANDBOX   = false
    RUN_NOTIFY_STEP          = false

    HCS_CUSTOMER_ID          = 'acme'
    HCS_PROJECT_ID           = 'hc2'
    HCS_PACKAGE_VERSION      = 'v01.01'
    HCS_PACKAGE_SKELETON     = "${workspace}/jenkins/hcs_package_skeleton.zip"
  
    STOREFRONT_NAME          = 'athenasstorefront'
    PROJECT_PACKAGE          = 'com.sap.cd.b2bmvp'
    ENVIRONMENT_NAME         = 'local'
 
    PLATFORM_HOME            = 'hybris/bin/platform'
    BINARIES_HOME            = 'hybris/bin/'
    HYBRIS_HOME              = "${workspace}/hybris"
    ANT_INSTALATION          = 'hybris-ant'
    HCS_PACKAGES_FOLDER      = '/Users/i848340/hcs_packages'
    YCONS_PATH               = '/Users/i848340/athenas-consolidation'
    YCONS_PLATFORM_HOME      =  "${env.YCONS_PATH}/hybris/bin/platform"
    YCONS_HYBRIS_HOME        =  "${env.YCONS_PATH}/hybris"

    SLACK_CHANNEL            = 'pipelines'
    SLACK_ENDPOINT           = 'https://hooks.slack.com/services/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'
    JUNIT_RESULT             = 'hybris/log/junit/TESTS-TestSuites.xml'
     
    HYBRIS_ZIP               = '/Users/i848340/binaries/hybris-6.4.0.0.zip'
  }

  stages {
    stage('Log Info') {
      steps {        
          echo "Build: ${env.RUN_DISPLAY_URL}"   
          echo "Branch: ${env.BRANCH_NAME} "
          echo "Commit: ${env.GIT_COMMIT} "
      }
    }

    stage('Reset Platform') {
      when { 
        beforeAgent true
        anyOf { 
          branch 'master';
          branch 'staging';
          environment name: 'RUN_RESET_PLATFORM_STEP', value: 'true'
        }
      }
      steps {           
        erasePlatform()
        unzipPlatform() 
      }
    }
    
    stage('Checkout code from SCM') {
      steps {   
        checkout scm
      }
    }

    stage('Build') {
      when { 
        beforeAgent true
        anyOf { 
          branch 'full-reports';
          branch 'staging';
          environment name: 'RUN_BUILD_STEP', value: 'true'
        }
      }
      steps {
        antBuilds()
      }
    }

    stage('Generate Production Package') {
      when { 
        beforeAgent true
        anyOf { 
          branch 'develop';
          branch 'hcs-*';
          environment name: 'RUN_PRODUCTION_PACKAGING', value: 'true'
        }
      }
      steps {   
        generateProductionPackage()
      }
    }

    stage('Deploy to Sandbox') {
      when { 
        beforeAgent true
        anyOf { 
          branch 'develop';
          environment name: 'RUN_DEPLOYMENT_SANDBOX', value: 'true'
        }
      }
      steps {   
        deployToConsolidation()
      }
    }

    stage('Run Tests') {
      when { 
        beforeAgent true
        anyOf { 
          branch 'full-reports';
          environment name: 'RUN_TESTS_STEP', value: 'true'
        }
      }
      steps {   
        runTests()
      }
    }

    stage('SonarQube') {
      when { 
        beforeAgent true
        anyOf { 
          branch 'full-reports';
          environment name: 'RUN_SONAR_STEP', value: 'true'
        }
      }
      steps {   
        withSonarQubeEnv('SonarQube') {
          sh "ls -al"
          sh "${env.SCANNER_HOME}/bin/sonar-scanner -Djavax.net.debug=all -Djavax.net.debug=ssl:handshake -Dproject.settings=./sonar.properties"
        }   
      }
    }

    stage('Notify') {
      when {
          beforeAgent true
          environment name: 'RUN_NOTIFY_STEP', value: 'true'
      }
      steps {   
        notifySlack "Pipeline ${env.BRANCH_NAME} finished! // Blue Ocean: ${env.RUN_DISPLAY_URL}", env.SLACK_CHANNEL
      }
    }
  }
}
