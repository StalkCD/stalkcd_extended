pipeline {
    //agent { docker { image 'maven:3.3.3' } }
    agent {
        label 'master'
     }
    stages {
        stage('build') {
            steps {
                //https://plugins.jenkins.io/pipeline-maven  - this needs pipeline maven plugin
             withMaven(
                 maven: 'maven-3.5.4', mavenLocalRepo: '/m2_repo') {
                sh 'mvn clean compile'
              }
            }
        }
    }
}
