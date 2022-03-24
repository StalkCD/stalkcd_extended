import java.text.SimpleDateFormat

readProperties = loadConfigurationFile 'configFile'

pipeline {
  agent any 
  environment {
    AWS_ACCESS = credentials('aws_credentials')
    AWS_ACCESS_KEY_ID = "${env.AWS_ACCESS_USR}"
    AWS_SECRET_ACCESS_KEY = "${env.AWS_ACCESS_PSW}"
  }
  triggers {
    pollSCM('H/5 * * * *')
  }
  stages {
    stage('Static Code Analisys'){
      agent {
        docker {
          image readProperties.imageChef
        }
      }
      when { 
        expression{ env.BRANCH_NAME ==~ /dev.*/ || 
          env.BRANCH_NAME ==~ /PR.*/ || env.BRANCH_NAME ==~ /feat.*/ }
      }
      steps{
        parallel(
          Step1:  {
            chefLintRobocop()
          },
          Step2:  {
            chefLintFoodcritic()
          }
        )  
      }
    }
    stage('Unit Tests'){
      agent {
        docker {
          image readProperties.imageChef
        }
      }
      when { 
        expression{ env.BRANCH_NAME ==~ /dev.*/ || 
            env.BRANCH_NAME ==~ /PR.*/ || env.BRANCH_NAME ==~ /feat.*/ }
      }
      steps {
        chefSpecRun()
      }
    }
    stage('Integration Tests'){
      agent {
        docker {
          image readProperties.imageChef
        }
      }
      when { 
        expression{ env.BRANCH_NAME ==~ /dev.*/ || 
            env.BRANCH_NAME ==~ /PR.*/ }
      }
      steps {
        chefIntegrationTest()
      }
    }
    stage('Generate PR'){
      agent{
        docker {
          image readProperties.imagePipeline
        }
      }
      when { expression{ env.BRANCH_NAME ==~ /feat.*/ } }
      steps{
          createPR "jenkinsdou", 
          readProperties.title, 
          "dev", env.BRANCH_NAME,
          "gmlp"
          slackSend baseUrl: readProperties.slack,
          channel: '#devops_training_nov',
          color: '#00FF00', 
          message: "Please review and approve PR to merge changes to dev branch : https://github.com/gmlp/${JOB_NAME}/pulls"
      }
    }
    stage('Upload Cookbook to chef Server'){
      agent {
        docker {
          image readProperties.imageChef
        }
      }
      when { expression{ env.BRANCH_NAME ==~ /dev.*/ || env.BRANCH_NAME ==~ /PR.*/ }}
      steps {
        chefUploadCookbook 'dou_vault_installer'
      }
    }
  }
  post { 
    success { 
      slackSend baseUrl: readProperties.slack, channel: '#devops_training_nov', color: '#00FF00', message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})"
    }
    failure {
      script{
        def commiter_user = sh "git log -1 --format='%ae'"
        slackSend baseUrl: readProperties.slack, channel: '#devops_training_nov', color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})"
      }
    }  
    always {
      sh "docker system prune -f"
    }
  }
}
