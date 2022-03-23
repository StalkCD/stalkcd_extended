pipeline {
  agent any
  parameters {
    string(name: "pipeline_name", description: "Pipeline Name for the Demo Project Folder")
  }
  stages {
    stage('Creating Pipeline Demo Jobs'){
      steps {
        script {
          PROJECT_NAME = pipeline_name.replaceAll("[^A-Za-z0-9\\- ]", "").replace(' ', '-').toLowerCase()
          PROJECT_KEY = PROJECT_NAME.substring(0,4).toUpperCase()
        }
        jobDsl ignoreExisting: true, ignoreMissingFiles: true, targets: "pipelineGenerator.groovy", additionalParameters: [projectName: PROJECT_NAME, projectKey: PROJECT_KEY]
      }
    }
  }
}
