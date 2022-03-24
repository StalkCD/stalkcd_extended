pipeline {
    agent { label 'master' }
    stages {
        stage ('Checkout') {
          steps {
            git 'https://github.com/jmprabhakaran/spring-petclinic.git'
          }
        }
        stage('Build') {
            agent { docker 'maven:3.5-alpine' }
            steps {
                sh 'mvn clean package'
                junit '**/target/surefire-reports/TEST-*.xml'
                archiveArtifacts artifacts: 'target/*.war', fingerprint: true
            }
        }
        stage('Deploy') {
          steps {
            input 'Do you approve the deployment?'
            sh 'curl -v -u admin:admin -T /var/lib/jenkins/workspace/spring_petclinic_pipeline@2/target/*.war http://52.206.180.13:8080/manager/text/deploy?path=/petclinic&update=true'
          }
        }        
    }
}

