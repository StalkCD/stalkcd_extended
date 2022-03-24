pipeline {
       
       agent {
              dockerfile {}
       }
       
       options { 
              buildDiscarder(logRotator(numToKeepStr: '10')) 
       }
       
       environment {
              JAVA_HOME = "${tool "Oracle JDK 1.8 (latest)"}"
              EXTRA_MAVEN_ARGS = "org.jacoco:jacoco-maven-plugin:0.7.9:prepare-agent -e -fae -Dsonar.branch=${JOB_NAME}-${BRANCH_NAME} -Djacoco.destFile='${WORKSPACE}/target/jacoco.exec' -Djacoco.append=true -Dsonar.jacoco.reportPaths=$WORKSPACE/target/jacoco.exec"
              MAVEN = "${tool "Maven (latest)"}"
              ALLURE = "${tool "allure-2.6.0"}"
              MAVEN_GLOBAL_SETTINGS = "/home/jenkins/.m2/settings.xml"
       }
       
       triggers {
              pollSCM('H/5 * * * *')
       }
       
       stages {        
              stage('Build') {
                     steps {  
                            configFileProvider([configFile(fileId: '68005326-2420-4ab1-9afa-9a38f4c456d2', targetLocation: "${env.MAVEN_GLOBAL_SETTINGS}")]) {
                             }
                            
                            sh 'echo $MAVEN_GLOBAL_SETTINGS'
                            sh 'mvn -s $MAVEN_GLOBAL_SETTINGS install $EXTRA_MAVEN_ARGS'
                            //checkstyle canComputeNew: false, defaultEncoding: '', healthy: '', pattern: '', unHealthy: ''
                     }                    
              }
              stage('Unit Tests') {
                     steps {
                            sh 'echo $MAVEN_GLOBAL_SETTINGS'
                            sh 'ls ${WORKSPACE} | echo'
                            //sh 'mvn -s $MAVEN_GLOBAL_SETTINGS verify $EXTRA_MAVEN_ARGS'
                            //junit allowEmptyResults: true, keepLongStdio: true, testResults: '**/target/surefire-reports/*.xml'
                           
                            //jacoco()
                     }
              }
              stage('Deploy') {
                     when { 
                            expression { return env.BRANCH_NAME == '1.x' || env.BRANCH_NAME == 'master'} 
                     }
                     steps {
                            sh 'echo $MAVEN_GLOBAL_SETTINGS'
                            echo "deploy"                           
                     }
              }
       }
       /*       post {
        always {
          deleteDir()
        }
        success {
          build 'Gateway-4.x'
          slackSend channel: '#gateway-bot',
                    teamDomain: 'mulesoft',
                    token: 'Fcg2g2hQtdR9EMSFEsboARw1',
                    color: '#BDFFC3',
                    message: "The pipeline ${currentBuild.fullDisplayName} completed successfully."
        }
        unstable {
          slackSend channel: '#gateway-bot',
                    teamDomain: 'mulesoft',
                    token: 'Fcg2g2hQtdR9EMSFEsboARw1',
                    color: '#FFFE89',
                    message: "The pipeline ${currentBuild.fullDisplayName} is unstable."
        }
        failure {
          slackSend channel: '#gateway-bot',
                    teamDomain: 'mulesoft',
                    token: 'Fcg2g2hQtdR9EMSFEsboARw1',
                    color: '#FF9FA1',
                    message: "The pipeline ${currentBuild.fullDisplayName} failed."
        }
      }*/
}
