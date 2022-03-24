pipeline {
  agent any
  stages {
    stage('Message') {
      steps {
        echo 'Building Software'
        bat 'dir'
      }
    }
    stage('Build') {
      steps {
        bat 'nuget.exe restore JenkinsPipelineTest.sln'
        bat "\"${tool 'MSBuild'}\\msbuild.exe\" \"JenkinsPipelineTest.sln\" /p:Configuration=Release /p:Platform=\"Any CPU\" /p:ProductVersion=1.0.0.${env.BUILD_NUMBER}"
      }
    }
    stage('Archive') {
      parallel {
        stage('Zip & Archive') {
          steps {
            zip(zipFile: 'Release.zip', archive: true, dir: 'JenkinsPipelineTest\\bin\\Release')
          }
        }
        stage('List Directory') {
          steps {
            bat 'dir /s /b'
          }
        }
      }
    }
  }
}