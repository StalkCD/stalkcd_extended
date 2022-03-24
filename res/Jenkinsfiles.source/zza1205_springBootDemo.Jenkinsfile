//Jenkinsfile (Declarative Pipeline)
#!groovy
pipeline{
    agent none
    options {
        timeout(time: 1, unit: 'HOURS')
    }
    stages {
        stage('Spring Boot Demo') {
            agent{
                node {
                    label ''
                }
            }
            steps {
                checkout([
                        $class                              :'GitSCM',
                        branches                            :[[name: '*/master']],
                        doGenerateSubmoduleConfigurations   : false,
                        extensions                          :[[]],
                        gitTool                             :'Default',
                        submoduleCfg                        :[],
                        userRemoteConfigs                   :[[
                                                                credentialsId: 'zza1205' + 'Cross.12345',
                                                                url     :'https://github.com/zza1205/springBootDemo'
                        ]]
                ])
                sh 'mvn 3.5.4' +
                        '-f pom.xml' + springBootDemo/pom.xml
                        '-U clean install'

            }
        }
    }
}
