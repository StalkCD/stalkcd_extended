@Library('jenkins-shared-libraries@project_easoi') _ //Importing shared Libraries
import src.lib.*;


pipeline {

  //agent - Specifies jenkins slave node where you want to run the jobs. Can be defined per stage as well.
    agent none

  // environment variable for the pipeline. Shared among stages.
    /*environment {
      key = value
     } */

     // parameters for manual triggers for stage specific run and deploying specific version
     /*
     parameters {
               choice(choices: 'all\npromote-to-dit\npromote-to-qa\npromote-to-prod', description: 'Which Stage', name: 'ENV_PROMOTE')
               string(name: 'ARTIFACT_VERSION', defaultValue: '', description: 'Enter Artifact version from Artifactory. Note: If no versioned entered, will deploy with current branch version.')
               string(name: 'CONFIG_VERSION', defaultValue: '', description: 'Enter config version from Artifactory. Probable Values: 1.0.0-SNAPSHOT, 1.0.0, LATEST-SNAPSHOT, LATEST-RELEASE')
           }
     */
     environment {
       //Common variables
       hipchatRoom = "EA-SOI" //Mandatory field
       email = "no-reply@kp.org"
       projectenv = "easoi"

       //Prod Environment
       prodLoginDomain = "bluemix_domain_url"
       prodCredentials = "<bluemix_credential_id_as_per_jenkins>"
       prodOrganization = "<bluemix_organization>"
       prodSpace = "<bluemix_space>"
       prodTestSuiteXML = "<test_suite_xml_file_including_path>"
       prodmokeTestEnv = "<prod_smokeTest_environment>"
       prodSplunkPort = "<prod_splunk_port>"
     }

//tools - Specify global tool configurations.
     tools {
         maven 'maven-3.3.9' //label should match Jenkins Global configuration name.
     }

    stages {
      stage ('Build') {
        agent any
        steps {
          buildMvn()
        }

      }

      stage ('Code Quality') {
        agent any
        steps {
            sh 'echo "code quality check"'
            codeQuality([ sonar: "true", //Mandatory
                  sonarExclusions: "${env.sonarExclusions}",
                  clover: "true", //Optional.
                  cobertura: "true" ])
            }
          post {
            success {
            publishReport ([ report_type: "clover", report_dir: "target/site/coverage", reportFiles: "coverage.xml" ])
            publishReport ([ report_type: "cobertura", report_dir: "target/site/coverage", reportFiles: "cobertura.html" ])
            publishReport ([ report_type: "html", report_dir: "target/site/coverage", reportFiles: "report.html" ])
                  }
                }

        }


      //Deployment & SmokeTest for Dev
      stage('Deploy & Smoke Test to Bluemix Dev') {
        agent any
        when {
          allOf {
              anyOf {
                branch 'master';
                branch '/release/*'
              }
              anyOf{
                expression { params.ENV_PROMOTE == 'all' }
                expression { params.ENV_PROMOTE == 'promote-to-dit' }
              }
          }
        }
          steps {
            sh 'echo "deployment section"'
          }


      }

      //Approval for QA
      stage ('Promote to QA?') {
        agent none
        when {anyOf { branch 'master'; branch '/release/*' } }
        steps {
          approve([environment: 'QA'])
        }
      }

      //Deployment & SmokeTest for QA
      stage('Deploy & Smoke for Bluemix QA') {
            agent any
            when {anyOf { branch 'master'; branch '/release/*' } }
            steps {
              sh 'echo "smoke test section"'
            }


        }

        //Approval for PROD
        stage ('Promote to PROD?') {
          agent none
          when { branch 'release/*' }
          steps {
            approve([environment: 'PROD'])
          }
        }

      //Deployment to PROD SJ
      stage('Deploy & Smoke for Bluemix PROD SJ') {
          agent any
          when { branch 'release/*' }
          steps {
            sh 'echo "deploy to PROD"'
          }


      }
    }
    //Pipeline Post steps
    post {
        always {
          deleteDir()
        }
        success {
            notify([hipchat_room: "${env.hipchatRoom}", //Mandatory
                    email: "${env.email}", //Optional
                    build_status: "SUCCESS" ])
        }
        failure {
            notify([hipchat_room: "${env.hipchatRoom}", //Mandatory
                    email: "${env.email}", //Optional
                    build_status: "FAILED" ])
        }
    }
}