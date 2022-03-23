def getCommit(){
  return sh(returnStdout: true, script: "git rev-parse HEAD | head -c 7").trim()
}

def node_details() {
    sh """
    printf "Node          : ${env.NODE_NAME}\nHostname      : \$(hostname)\n\$(docker --version)\n"
    """
}


def getBuildTimestamp(){
  return sh(returnStdout: true, script: "date +'%Y-%m-%dT%H:%M:%SZ'").trim()
}

def getVersion(){
  //sh(script: "git fetch --tags")
  return sh(returnStdout: true, script: "git describe --tags --abbrev=0").toString().trim()
}

def run_bandit_test(){
    return_s= sh(returnStatus:true, script:"docker run --rm -w /app_src -v \${PWD}:/app_src python:3.6-slim /bin/bash -c  \"chmod +x /app_src/bandit/run_bandit.sh;/app_src/bandit/run_bandit.sh\"")
    sh("chmod -R 777 ./bandit")
    echo "${return_s}"
    if ("${return_s}" != '0') {
      publishHTML (target: [
        allowMissing: false,
        alwaysLinkToLastBuild: false,
        keepAll: true,
        reportDir: './reports',
        reportFiles: 'banditReport.html',
        reportName: "Bandit Report"
      ])
      
      sh (script:"echo Bandit test failed && exit 1")
      //error "Bandit test failed"
      //currentBuild.result = 'FAILURE'
    }
}

def getVersioningVariables(){
    //sh "git fetch --tags"
    sh "echo -e \"export GIT_COMMIT=\$(git rev-parse HEAD)\nexport GHE_VERSION=\$(git describe --tags --abbrev=0)\nexport BUILD_TIMESTAMP=\$(date +'%Y-%m-%dT%H:%M:%SZ')\" > .version_vars.conf"
    stash includes: ".version_vars.conf", name:"versionVars"

    sh "echo \$(git rev-parse HEAD | head -c 7)-\$(date +%Y%m%d%H%M%S)  > .docker.tag"
    stash includes: '.docker.tag', name: 'dockerTag'
}

pipeline {
  agent any
  environment {
      GIT_COMMIT=getCommit()
      dir=pwd()
      INIT_GENERATOR_SCRIPT='generate-init-py.sh'
    }
    
  stages {
    stage("env"){
      agent any
      steps{
        echo sh(returnStdout: true, script: 'env')
      }
    }
    stage("init"){
      parallel{
        stage("pre-setup"){
          agent any
          steps{
            echo "this is an init stage"
            getVersioningVariables()
          }
        }
        stage("parallel stage"){
          agent any
          steps{
            echo "bam!"
          }
        }
      }
    }
    stage("Main Pipeline"){
      parallel {
        stage('Bandit Test'){
            agent any
            steps {
                run_bandit_test()
            }
        }   
        stage('x86') {
          agent any
          stages {
            stage('init x86_64') {
                steps {
                    script {
                        env.X86_NODE = "${env.NODE_NAME}"
                        node_details()
                    }
                }
            }
            stage('Build x86_64') {
                steps {
                    script {
                        echo "build"
                    }
                }
            }

            stage('Publish x86_64') {
                steps {
                    script {
                        echo "publish"
                    }
              }
            }
          }
        }
      }
    }
        stage("Test parallel stage"){
          steps{
            unstash "dockerTag"
            sh "ls -la"
            sh "cat .docker.tag"
            sh "sleep 150"
          }
        }
      }
    
  
  // Post in Stage executes at the end of Stage instead of end of Pipeline
  post {
    always{
      deleteDir()
    }
    success {
      echo "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})"
    }
    unstable {
      echo "UNSTABLE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})"
    }
    failure {
      echo "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})"
    }
  }
}

