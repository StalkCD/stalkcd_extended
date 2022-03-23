pipeline {
  agent none
    stages {
        stage('Build') {
          agent{
          docker {
              image 'maven:3-alpine'
              args '-v $HOME/.m2:/root/.m2'
              label 'jenkins_agent1'
          }
        }
            steps {
              checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'CleanBeforeCheckout']], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/ChanduReddy123/javasample.git']]])
                sh '''
                cd SpringMVCSecurityXML
                mvn clean package
                '''
            }
        }
        stage('Deploy') {
          agent {
            label 'jenkins_agent1'
          }
          steps {
            sh'''
            TotalWebservers=`docker container ls -a | grep webserver | wc -l`
            if [ $TotalWebservers -gt 0 ]; then docker container rm -f webserver;fi
             docker run -d --rm --network chandu --name webserver -p 8888:8080 -v $WORKSPACE/../JenkinsDockerPipeline@2/SpringMVCSecurityXML/target:/usr/local/tomcat/webapps/ tomcat:alpine
            '''
          }

        }
        stage('testing') {
          agent {
                docker {
                        image 'node:7-alpine'
                         label 'jenkins_agent1'
                        }
                }
                steps {
                  sh '''
                  touch hi
                  cat hello>hi
                  '''
                }
        }
    }
}
