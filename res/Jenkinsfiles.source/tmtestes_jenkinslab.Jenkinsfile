// Declarative //
pipeline {
   agent any
    environment {
          SUCCESS_BODY_MAIL = readFile('build/success.html')
          FAIL_BODY_MAIL    = readFile('build/failure.html')
          REPLY_TO          = ''
          MAIL_TO           = 'mauricio.freire@tmtestes.com.br'
          STATUS_CODE       = 0
    }
    stages {
        stage('Build') {
                agent {
                    label 'master'
                }
                steps {
                    echo 'Building..'
                }
          
            }
        stage('Testing with Charles') {
            agent {
                label 'w10_lab'
            }
            steps {
               echo 'Start testing.....'
               script {
                   try {
                       // do something that doesn't fail
                       bat script: 'build/charles.bat'
                       currentBuild.result = 'SUCCESS'
                   } catch (Exception err) {
                       currentBuild.result = 'FAILURE'
                   }
                   stash includes: 'build/report/*', name: 'report'
                   dir('build/report') {
                     deleteDir()
                   }
                   echo "RESULT: ${currentBuild.result}"
               }
               
            }
        }        
        stage('Deploy') {
            agent {
                label 'master'
            }
            steps {
                 echo 'Start Deploy.....'
                 checkout scm
            }
        }
    }
    post {
       always {
                echo 'Post build actions start.....'
                unstash 'report'
       }

       success {
         emailext (
                    body:  env.SUCCESS_BODY_MAIL
                  , attachmentsPattern: 'build/report/*.*'
                  , attachLog: false
                  , from: env.REPLY_TO
                  , replyTo: env.REPLY_TO
                  , subject: "Pipeline results of Job: '${JOB_NAME}' - (${BUILD_NUMBER}) - Terminated successfully -> Details:  ${BUILD_URL}"  
                  , to: env.MAIL_TO
                  )
               dir('build/report') {
                  deleteDir()
               }
      }
      failure {
        emailext (
                    body:   env.FAIL_BODY_MAIL
                  , attachmentsPattern: 'build/report/*.*'
                  , attachLog: true
                  , from: env.REPLY_TO
                  , replyTo: env.REPLY_TO
                  , subject: "Pipeline results of Job: '${JOB_NAME}' - (${BUILD_NUMBER}) - Terminated with error -> Details:  ${BUILD_URL}"  
                  , to: env.MAIL_TO
                  )
        dir('build/report') {
          deleteDir()
        }
      }   
   }
}

