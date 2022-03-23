pipeline {
    agent { label "only-java" }
     tools {
        git 'test' 
        maven 'maven'
     }
     environment {
      version = "1.0.2"
     }
     stages {

stage ('Initialize') {
  //  agent { label "only-java" }
            steps {
               dir("test-pipeline"){
                sh '''
                    echo "PATH = ${PATH}"
                    echo "M2_HOME = ${M2_HOME}"
                '''
               }
            }
        }
    stage('Build') {
    //  agent { label "only-java" }
          steps {
             dir("test-pipeline"){
            sh '''
              mvn versions:set -DnewVersion=${version}-RELEASES"
              mvn -Dmaven.test.failure.ignore clean package"
            '''
             }
          }
        }
     //   stage('Deploy') { 
     //     agent { label "only-java" }
     //     steps {
    //          nexusPublisher nexusInstanceId: 'nexus', nexusRepositoryId: 'maven-releases', packages: [[$class: 'MavenPackage', mavenAssetList: [[classifier: '', extension: '', filePath: "${artifact_path}"]], mavenCoordinate: [artifactId: "my-app", groupId: 'nexus.com', packaging: 'jar', version: "${version}-RELEASES"]]]
     //      }
   //       }           
        }
}