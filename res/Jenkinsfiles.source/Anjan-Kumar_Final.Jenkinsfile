// A Declarative Pipeline is defined

pipeline {

     // agent defines where the pipeline will run.

     agent {
        node {
            label 'master'
           }
         }

stages {
  // At least one stage is required.

    stage('Pre Build') {
    // Every stage must have a steps block containing at least one step.  
      steps {
        // You can use steps that take another block of steps as an argument,
        // like this.    
        sh 'echo "Started...!" '
            echo sh(script: 'env|sort', returnStdout: true)
        }
    }

    // You can override tools, environment and agent on each stage if you want.
    //Giving the code to perform terraform action 
    //Providing AWS credentials in pipeline to communicate with AWS
    stage('Terraform Deployment') {
        steps {
            withCredentials([
                usernamePassword(credentialsId: 'Anjan-AWS', passwordVariable: 'AWS_SECRET', usernameVariable: 'AWS_KEY'),
            ]) {
                sh '''
                    terraform init
                    terraform apply -auto-approve -var aws_access_key=${AWS_KEY} -var aws_secret_key=${AWS_SECRET}
                '''
            }
        }
    }
    //If Build success giving the output as Success
    stage('Deployment Done') {
        steps {
            sh 'echo "Success....!!"'
        }
    }
  }
}



