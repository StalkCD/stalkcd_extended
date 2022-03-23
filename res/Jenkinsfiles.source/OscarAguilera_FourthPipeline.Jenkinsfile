/*Underneath the hood, there are a few things agent causes to happen:

All the steps contained within the block are queued for execution by Jenkins. As soon as an executor is available, the steps will begin to execute.

A workspace is allocated which will contain files checked out from source control as well as any additional working files for the Pipeline.

There are several ways to define agents for use in Pipeline, for this tour we will only focus on using an ephemeral Docker container.

Pipeline is designed to easily use Docker images and containers to run inside. This allows the Pipeline to define the environment and tools required without having to configure various system tools and dependencies on agents manually. This approach allows you to use practically any tool which can be packaged in a Docker container. */
appData = loadConfigurationFile 'configFile'
            def buildParameters = "\n" \
         + 'Application  : ' + appData.helm_chart + '\n' \
         + 'Build Branch : ' + appData.buildVersion + '\n' \
         /*+ 'Build URL    : ' + appData.env.BUILD_URL + '\n'*/
            println "Build Parameters : " + buildParameters
pipeline {
    agent none /* Defining agent none at the top-level of the Pipeline ensures that an Executor will not be assigned unnecessarily. Using agent none also forces each stage section to contain its own agent section. */ 
    stages {
        stage ('Example Build') {
            agent {docker 'maven:3-alpine'} /* Second Agent. Execute the steps in this stage in a newly created container using this image of maven3 apline. */
            steps {
                echo 'Hello Maven'
                sh 'mvn -version'
            }
        }
        stage ('Example Test') {
            agent {docker 'openjdk:8-jre'} /*Third agent. Execute the steps in this stage in a newly created container using a different image of openjdk, than the previous stage. */
            steps{
                echo 'Hello JDK, how are you???'
                sh 'java -version'
            }
        }
    }
}