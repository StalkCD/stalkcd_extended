pipeline{
    agent{label 'cm-cent7x64-p4'}
    stages{
        stage('build'){
            steps{
                sh 'gcc -o add Add.c'
            }
        }
        stage('Test'){
            steps{
                echo "testing..."
            }
        }
        stage('delivery'){
            steps{
                echo "deliverying..."
            }
        }
    }
        post{
            success{
                script{
                    mail bcc: '', body: "${JOB_NAME}':success!'", cc: '', from: '1336580344@qq.com', replyTo: '', subject: 'PipelineTest', to: 'v-lmengn@microsoft.com'
                }
            }
            failure{
                script{
                    mail bcc: '', body: "${JOB_NAME}':failure!#'${BUILD_NUMBER}", cc: '', from: '1336580344@qq.com', replyTo: '', subject: 'PipelineTest', to: 'v-lmengn@microsoft.com' 
                }
            }
        }
  }

