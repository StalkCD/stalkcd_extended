def getProjectName() {
    return 'JenkinsPipeline'
}

def getJDKVersion() {
    return 'jdk1.8.0_101'
}

def getMavenConfig() {
    return 'maven-config'
}

def getMavenLocation() {
    return 'Maven3'
}

def getEnvironment() {
    return  'QA\n' +
            'STG\n' +
            'PRD'
}


def getEmailRecipients() {
    return ''
}

def getReportZipFile() {
    return "Reports_Build_${BUILD_NUMBER}.zip"
}

def getS3ReportPath() {
    return "$projectName"
}

def publishHTMLReports(reportName) {
    // Publish HTML reports (HTML Publisher plugin)
    publishHTML([allowMissing         : true,
                 alwaysLinkToLastBuild: true,
                 keepAll              : true,
                 reportDir            : 'target\\view',
                 reportFiles          : 'index.html',
                 reportName           : reportName])
}

/* Declarative pipeline must be enclosed within a pipeline block */
pipeline 
{
    // agent section specifies where the entire Pipeline will execute in the Jenkins environment
    agent 
    {
        /**
         * node allows for additional options to be specified
         * you can also specify label '' without the node option
         * if you want to execute the pipeline on any available agent use the option 'agent any'
         */
        node 
        {
            label '' // Execute the Pipeline on an agent available in the Jenkins environment with the provided label
        }
    }

    /**
     * tools to auto-install and put on the PATH
     * some of the supported tools - maven, jdk, gradle
     */
    tools 
    {
        jdk 'java 8'
        maven 'Maven3'
        
    }

    /**
     * parameters directive provides a list of parameters which a user should provide when triggering the Pipeline
     * some of the valid parameter types are booleanParam, choice, file, text, password, run, or string
     */
    parameters 
    {
        choice(choices: "$environment", description: '', name: 'ENVIRONMENT')
        string(defaultValue: "$emailRecipients",
                description: 'List of email recipients',
                name: 'EMAIL_RECIPIENTS')
    }

    /**
     * stages contain one or more stage directives
     */
    stages {
        /**
         * the stage directive should contain a steps section, an optional agent section, or other stage-specific directives
         * all of the real work done by a Pipeline will be wrapped in one or more stage directives
         */
        

        stage('User Input') 
        {
            // when directive allows the Pipeline to determine whether the stage should be executed depending on the given condition
            // built-in conditions - branch, expression, allOf, anyOf, not etc.
            when {
                // Execute the stage when the specified Groovy expression evaluates to true
                expression {
                    return params.ENVIRONMENT ==~ /(?i)(STG|PRD)/
                }
            }
            /**
             * steps section defines a series of one or more steps to be executed in a given stage directive
             */
            steps {
                // script step takes a block of Scripted Pipeline and executes that in the Declarative Pipeline
                script {
                    // This step pauses Pipeline execution and allows the user to interact and control the flow of the build.
                    // Only a basic "process" or "abort" option is provided in the stage view
                    input message: '', ok: 'Proceed',
                            parameters: [
                                    string(name: '', description: ''),
                            ]
                }
            }
        }

        stage('Maven version') {
            steps {
                echo "Hello, Maven"
                sh "mvn --version" // Runs a Bourne shell script, typically on a Unix node
            }
        }

        stage('Maven Install') {
            steps {
                script {
                    /**
                     * Override maven in this stage
                     * you can also use 'tools {maven: "$mavenLocation"}'
                     *
                     * globalMavenSettingsConfig: Select a global maven settings element from File Config Provider
                     * jdk: Select a JDK installation
                     * maven: Select a Maven installation
                     */
                   
                        try {
                            sh "mvn -f com.wallet/pom.xml clean install"
                        } catch (Exception err) {
                            echo 'Maven clean install failed'
                            currentBuild.result = 'FAILURE'
                        } finally {
                            publishHTMLReports('Reports')
                        }
                    
                }
            }
        }
        stage('SonarQube analysis') { 


        steps{
        script {
                scannerHome = tool 'sonar-scanner'
              withSonarQubeEnv('SonarQube Scanner') 
              {
              sh "${scannerHome}"
              sh 'mvn sonar:sonar ' + 
              '-f com.wallet/pom.xml ' +
              '-Dsonar.projectKey=Digital_Wallet' +
              '-Dsonar.login=$SONAR_UN ' +
              '-Dsonar.password=$SONAR_PW ' +
              '-Dsonar.language=java ' +
              '-Dsonar.sources=. ' +
              '-Dsonar.tests=. ' +
              '-Dsonar.test.inclusions=**/*Test*/** ' +
              '-Dsonar.exclusions=**/*Test*/**'
              }
        }
        }
        
      
    }


        

       
    }

    /**
     * post section defines actions which will be run at the end of the Pipeline run or stage
     * post section condition blocks: always, changed, failure, success, unstable, and aborted
     */
    

    // configure Pipeline-specific options
    options {
        // keep only last 10 builds
        buildDiscarder(logRotator(numToKeepStr: '3'))
        // timeout job after 60 minutes
        timeout(time: 60,
                unit: 'MINUTES')
    }

}
