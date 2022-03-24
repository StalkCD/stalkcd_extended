// the label is unique and identifies the pod descriptor and its resulting pods
// without this, the agent could be using a pod created from a different descriptor
env.label = "ci-pod-${UUID.randomUUID().toString()}"

pipeline {
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
    preserveStashes()
  }
  agent {
    kubernetes {
      label "${env.label}"
      defaultContainer 'jnlp'
      yaml """
apiVersion: v1
kind: Pod
metadata:
spec:
  containers:
  - name: python-alpine
    image: python:alpine
    args:
    - cat
    tty: true
    imagePullPolicy: Always
#    resources:
#      limits:
#        memory: "8Gi"
#        cpu: "1.75"
"""
    }
  }
  environment {
    FOO = "BAR"
  }
  stages {
    stage('build') {
      agent {
        kubernetes {
          label "${env.label}"
        }
      }
      steps {
        container('python-alpine') {
          sh "./ci-pipeline.sh"
          //archiveArtifacts artifacts: 'bundles/*.zip'
          //stash includes: 'bundles/*', name: 'build-bundles'
        }
      }
    }
  }
}