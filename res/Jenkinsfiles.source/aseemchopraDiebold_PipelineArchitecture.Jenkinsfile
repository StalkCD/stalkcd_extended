pipeline {
  agent any
  stages {
    stage('Citi-Global-Terminal-App') {
      parallel {
        stage('Build: Citi-Global-WebApp') {
          steps {
            build 'Build Control Pipeline'
          }
        }
        stage('Build: Citi-Global-Extension') {
          steps {
            build 'angularDependencyManagement'
          }
        }
      }
    }
    stage('Package: Citi-Global-SmartATM') {
      steps {
        echo 'Hello Smart App Build Stage'
        currentBuild.result = "FAILURE"
      }
    }
    stage('Test: Citi-Global-Terminal-App') {
      steps {
        build 'Test Control Pipeline'
      }
    }
  }
}
