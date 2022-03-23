#!/usr/bin/env groovy

String buildDir = 'BUILD'
String targetDir = 'TARGET'

pipeline {
  agent { node { label 'cpp' } }

  triggers {
    pollSCM('')
  }

  options {
    disableConcurrentBuilds()
  }

  parameters {
    booleanParam(name: 'CLEAN_BUILD', defaultValue: false, description: 'clean workspace before build')
    string(name: 'NUM_JOBS', defaultValue: '4', description: 'number concurrent cmake build jobs (processes)')
    string(name: 'CMAKE_BUILD_OPTS', defaultValue: '-DTESTS=ON', description: 'cmake build opts')
  }

  stages {
    stage('Build') {
      steps {
        echo "doing the cmake build"
        sh "mkdir -p ${workspace}/${buildDir}"

        script {
          if (params.CLEAN_BUILD == true) {
            echo 'cleaning build dir'
            dir("${workspace}/${buildDir}") {
              deleteDir()
            }
          }
        }
        dir("${workspace}/${buildDir}") {
            sh "cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_LINKER=/usr/bin/ld.gold -DCMAKE_INSTALL_PREFIX=${workspace}/${targetDir} ${params.CMAKE_BUILD_OPTS} ${workspace}"
            sh "make -j${params.NUM_JOBS} testrunner"
        }
      }
    }

    stage ('Test') {
      steps {
        echo 'running the test suite'
        dir("${workspace}/${buildDir}") {
            sh "make -j${params.NUM_JOBS} testrun"
            junit 'test.xml'
        }
      }
    }

    stage ('Documentation') {
      steps {
        echo 'running doxygen'
        dir("${workspace}/${buildDir}") {
            sh "make docs"
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: "${workspace}/${buildDir}/doc/html", reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: ''])
        }
      }
    }
  }

  post {
    always {
      echo 'cppmetrics pipeline finished'
    }
    success {
      echo 'cppmetrics pipeline completed successfully'
    }
    failure {
      echo 'cppmetrics pipeline failed'
    }
    unstable {
      echo 'cppmetrics pipeline was marked as unstable'
    }
    changed {
      echo 'cppmetrics pipeline status has changed'
    }
  }
}
