pipeline {
  agent {
    node {
      label "jenkins-agent"
      customWorkspace "workspace/${URLDecoder.decode(JOB_NAME)}/${BUILD_NUMBER}"
    }
  }
  stages {
    stage('Compile & Check') {
      steps {
        sh './gradlew clean check'
        publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'build/reports/checkstyle', reportFiles: 'main.html', reportName: 'Checkstyle Report', reportTitles: 'Checkstyle Report'])
      }
    }
    stage('SonarQube analysis') {
      steps {
        script {
          scannerHome = tool 'SonarQube'
        }
        withSonarQubeEnv('SonarQube') {
          sh "${scannerHome}/bin/sonar-scanner"
        }
      }
    }
    stage('Package') {
        steps {
            sh './gradlew clean bootJar'
            stash includes: 'build/libs/*.jar', name: 'gradle-ci-cd-jar'
        }
    }
  }
  post {
      failure {
          mail to: 'guangliang1120@gmail.com',
          subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
          body: "Something is wrong with ${env.BUILD_URL}"
      }
  }
}
