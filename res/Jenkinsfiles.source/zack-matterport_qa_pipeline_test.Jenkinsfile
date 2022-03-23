pipeline {
  agent {
    node {
      label 'master'
    }
  }
  triggers {
    pollSCM('* * * * *') //runs this pipeline on every commit
    cron('1 15 * * *') //run at 14:30:00 
  }

  stages {
    stage('Smoke Tests') {
      parallel {
        stage('SmokeTest 1') {
          agent { label "master"}
            steps {
              echo 'SmokeTest 1 runs with every commit'
              script {
                if (Calendar.instance.get(Calendar.HOUR_OF_DAY) in 16 == true) {
                  trigger = '(nightly)'
                  // commit test run
                  echo "Nightly trigger"
                } else {
                  trigger = '(Commit trigger)'
                  // Nightly test run
                  echo "Commit trigger"
                }
              }
            }
          }
        stage('SmokeTest 2') {
          agent { label "master"}
            steps {
              echo 'SmokeTest 2 runs with every commit'
              sleep 2
              sh "ls -l"
            }
          }
        }
      }

    stage('Regression Tests') {
      parallel {
        stage('Regression 1') {
          when {//runs only when the expression evaluates to true
                expression {//will return true when the build runs via cron trigger (also when there is a commit at night between 14:00 and 14:59)
                    return Calendar.instance.get(Calendar.HOUR_OF_DAY) in 15
                }
            }
          agent { label "master" }
            steps {
              echo 'Regression 1 only runs at night'
            }
          }
        stage('Regression 2') {
          when {//runs only when the expression evaluates to true
                expression {//will return true when the build runs via cron trigger (also when there is a commit at night between 14:00 and 14:59)
                    return Calendar.instance.get(Calendar.HOUR_OF_DAY) in 15
                }
            }
          agent { label "master" }
            steps {
              echo 'Regression 2 only runs at night'
              // long ruinning test...
              sleep 2
              }
            }
          } // End parallel
        }
      } // End stages

  options {
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }
}
 
