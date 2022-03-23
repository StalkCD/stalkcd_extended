pipeline {
  agent any
  stages {
   stage('Build') {
     steps {
       awsCodeBuild projectName: 'JenkinsPipelineExampleSFO',
                   credentialsId: 'pipelineExample',  
                   credentialsType: 'jenkins',
                   region: 'us-west-1',
                   sourceControlType: 'jenkins'

     }
   }
  }
}
