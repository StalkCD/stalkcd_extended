def providerId
def rootschema

pipeline {
    agent any

    parameters {
        string(name: 'providerId')
        string(name: 'rootschema')
    }

    stages {
        /*
        stage('identifyProvider') {
            steps{
                script 
                {
                providerId = sh (
                    script: "echo \$(curl -s \"https://raw.githubusercontent.com/cjf-fuller/jenkins_pipeline/master/AwsSampleJsonPayload.json\" | jq '.providerId')",
                    returnStdout: true
                ).trim()
                rootschema = sh (
                    script: "echo \$(curl -s \"https://raw.githubusercontent.com/cjf-fuller/jenkins_pipeline/master/AwsSampleJsonPayload.json\")",
                    returnStdout: true
                ).trim()
                }
            }  
        }*/
        stage('selectProviderAndInvokePipeline') {
            steps {
                script {
                     if (params.providerId == "azr")
            {
                build job: 'azr_pipeline_demo', parameters: [
                    string(name: 'RootSchemaAzr', value: params.rootschema)
                ]
            }
            else if (params.providerId == "aws")
            {
                build job: 'aws_pipeline_demo', parameters: [
                    string(name: 'RootSchemaAws', value: params.rootschema)
                ]
            }
            else if (params.providerId == "gcp")
            {
                build job: 'gcp_pipeline_demo', parameters: [
                    string(name: 'RootSchemaGcp', value: params.rootschema)
                ]
            }
            else
            {
                echo 'FAILED: NO PIPELINE CALLED PROVIDER ID NOT RETURNED'
            }
                }
            }
        }
    }
post {
        success {
            echo "Test succeeded"
        }
        failure {
            echo "Test failed"
        }
    }
}