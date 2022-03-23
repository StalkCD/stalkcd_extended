pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        step([$class: 'CopyArtifact', projectName: 'application-build'])
        gateConsumesArtifact file: 'application.sh'
      }
    }
  }
pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        step([$class: 'CopyArtifact', projectName: 'application-build'])
        gateConsumesArtifact file: 'application.sh'
      }
    }
  }
}
