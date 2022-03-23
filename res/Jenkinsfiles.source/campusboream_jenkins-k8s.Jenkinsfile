#!groovy


def branch = "${env.BRANCH_NAME}"

println "Running Jenkins Pipeline"
println "SCENARIO -> Stage: // Branch: ${branch}"

pipeline {
  agent {
    kubernetes {
      label 'builder-agent'
      yaml """
apiVersion: v1
kind: Pod
metadata:
labels:
  component: ci
spec:
  # Use service account that can deploy to all namespaces
  serviceAccountName: jenkins
  containers:
  - name: jnlp
    env:
    - name: JENKINS_URL
      value: http://jenkins:8080
  - name: node
    image: node:10.7.0
    command:
    - cat
    tty: true
  - name: kubectl
    image: gcr.io/cloud-builders/kubectl
    command:
    - cat
    tty: true
"""
}
  }
  stages {
    
   
    stage('3 - Deploy') {
      when {
        anyOf {
          allOf {
            expression { branch == 'develop'}
          }
          allOf {
            expression { branch == 'master'}
          }
        }
      }
      steps{
        script {
            stage ('3a - Deploying to Staging') {
              container('kubectl') {
              
                
                sh("kubectl apply -f deployment.yaml")
                
              }
            }
        }
          
        
      }
    }
  }
}
