#!/usr/bin/env groovy

# we need to configure pipeline libraries in Jenkins with pipeline libraries
@Library() _

def config = [
    agentLabel: 'docker-local',
    emailRecipients: '<maintainerEmail or DL>@xyz.com',
    dockerRegistryCredentials: 'credentials for DTR'
]


pipeline {
    agent {
        label config.agentLabel
    }

    options {
        buildDiscarder(logRotator(numToKeepStr:'10'))
        disableConcurrentBuilds()
        timeout(time: 1, unit: 'HOURS')
        timestamps()
    }

    stages {

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Common tasks to clean and prepare for all builds
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        stage('clean-and-prepare'){
            steps {
                script {
                    context.prepare(config) # comes from pre defined jenkins library
                }
                echo "Branch name: ${env.BRANCH_NAME}"
            }
        }

        /**
         *  Install depends and Build all javascript
         */
        stage('build-javascript') {
            steps {
             
                dir('name of the UI module in the project') {

                    # need to pass the npm command to build UI module 
                    sh 'grunt'
                    sh 'grunt prepare-for-npm'
                }
                
            }
        }

        /**
         * Publish all javascript NPM modules
         */
        stage('publish-javascript') {
            when {
               # condition to run on specific branch
            }
            steps {
                # code for publishing UI artifacts

            }
        }
     
        /**
         * Build Java
         */
        stage('build-java') {
            when {
                # optional to add conditions 
            }
            steps {
                // maven settings files comes from jenkins master.
                // here we can also leverage Maven image from docker market place to build the maven module of the project
                // maven:3-jdk-8 will be dowbloaded from docker hub which starts a parallel container to build maven module 
                withMavenSettingsXml([mavenSettingsConfig: 'my-settings-xml', image: 'maven:3-jdk-8']) {
                    sh 'mvn -U clean install'
                }
            }
        }

        /**
         * Publish Java
         */
        stage('publish-java') {
            when {
                # conditions to deploy artifacts on certain branches 
            }
            steps {
                withMavenSettingsXml([mavenSettingsConfig: 'my-settings-xml', image: 'maven:3-jdk-8']) {
                    // Maven deploy commands follow, tests should be skipped as they already ran in the build stage above and are a time waste
                    sh "mvn deploy -DskipTests"
                }
            }
        }

        /********** END OF CODE BUILD *******/

        stage('docker-build-and-push') {                                                                     
            when {                                                                                                   
                branch 'master'                                                                                      
            }                                                                                                        
                                                                                                                    
            steps {                                                                                                  
                                                                                                                    
                //to do this it needs to create a dockerfile based on pom and package.json files                                                                                                 
                dir('dir-name') { 

                    // here dockerCreateRepository and dockerBuildandPush are predefined methods in custom Jenkins pipeline libraries                                                                        
                    dockerCreateRepository credentialsId: config.dockerRegistryCredentials,                          
                        repository: 'name for application in DTR'                                                            
                                                                                                                    
                    dockerBuildAndPush tags: ['latest', version],                                                    
                        credentialsId: config.dockerRegistryCredentials, image: 'project/name of the project in DTR'                
                                                                                                                    
                }                                                                                                    
            }                                                                                                        
        }

        stage ('example-deploy-stage') {
            when {
                branch 'production or DIT'
                environment name: 'Deploy to' value: 'DIT'
            }
            steps {
                echo 'deploying'
            }
        }                                                                                                            
    }

    post {
        always {
            email recipients: config.emailRecipients
            cleanWs()
        }
    }
}
