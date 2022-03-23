#!/usr/bin/env groovy

def header(label) {
    echo "/*************** $label ***************/"
}

/*
--- STASH ---
stash includes: 'path/to/things/*', name: 'binary'

unstash 'binary'


parallel (
    "stream 1" : { 
                     node { 
                           unstash "binparallel (
    "stream 1" : { 
                     node { 
                           unstash "binary"                           
                           sh "sleep 20s" 
                           sh "echo hstream1"
                       } 
                   },
    "stream 2" : { 
                     node { 
                           unstash "binary"
                           sh "echo hello2"
                           sh "hashtag fail"                                                       
                       } 
                   }
          )ary"                           
                           sh "sleep 20s" 
                           sh "echo hstream1"
                       } 
                   },
    "stream 2" : { 
                     node { 
                           unstash "binary"
                           sh "echo hello2"
                           sh "hashtag fail"                                                       
                       } 
                   }
          )
*/

//archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true 

/*
node {
  for (int i=0; i< 2; ++i) {  
    stage "Stage #"+i
    print 'Hello, world $i!'
  }

  stage "Stage Parallel"
  def branches = [:]
  for (int i = 0; i < numHelloMessages.toInteger(); i++) {
    branches["split${i}"] = {
      stage "Stage parallel- #"+i
      node('remote') {
       echo  'Starting sleep'
       sleep 10
       echo  'Finished sleep'
      }
    }
  }
  parallel branches
}
*/

/*
 stage('Tests') {
            parallel {
                stage('Unit Test') {
                    steps {
                        mvn 'test'
                    }
                }
                stage('Integration Test') {
                    steps {
                        mvn 'verify -DskipUnitTests -Parq-wildfly-swarm '
                    }
                }
            }
}
*/

/*pipeline {
    agent any
    stages {
        stage('Example') {
            steps {
                echo 'Hello World'

                script {
                    def browsers = ['chrome', 'firefox']
                    for (int i = 0; i < browsers.size(); ++i) {
                        echo "Testing the ${browsers[i]} browser"
                    }
                }
            }
        }
    }
}*/


pipeline {
    agent any
    stages {
        stage('Init'){
            steps {
                header("Running ${env.BUILD_ID}, number ${env.BUILD_NUMBER} - ${env.BUILD_DISPLAY_NAME}")
                echo sh(script: 'env|sort', returnStdout: true)
            }
        }

        stage('Build') {
            failFast true
            parallel {
                stage('mvn clean install in parallel') {       
                    agent {
                        label 'vms'
                    }        
                    steps {
                        header("Parallel running in vms slaves...")
                        sh 'uname -a'
                    }
                }            
            }
        }
        stage('Test') {
            steps {
                header("Testing..")
            }
         }
        stage('Deploy') {
            steps {
                header("Deploying....")
            }
        }
    }

    post {
        always {
            echo "Finished"
        }
            
        failure {  
            echo "with failure! ${currentBuild.result} | ${currentBuild.description}"
        }

        success {
            echo "Successful!"
        }

        unstable{
            echo "Unstable! ${currentBuild.result} | ${currentBuild.description}"
        }

        aborted{
            echo "Aborted! ${currentBuild.result} | ${currentBuild.description}"
        }
    }
}