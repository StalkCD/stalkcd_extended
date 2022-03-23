/*pipeline {
  agent any
  stages {
    stage('first stage') {
      parallel {
        stage('first stage') {
          steps {
            echo 'Hola caracola'
          }
        }
        stage('hola') {
          steps {
            echo 'ffdfd'
          }
        }
      }
    }
    checkpoint 'dddd'
    stage('second stage') {

       
          steps {
            checkpoint 'dddd'
          }
       
      
    }
    stage('third stage') {
      parallel {
        stage('third stage') {
          steps {
            ws(dir: 'sss')
          }
        }
        stage('error') {
          steps {
            sh 'sh "echo \'adios\'"'
          }
        }
      }
    }
  }
  options {
    skipDefaultCheckout()
  }
}

pipeline {
  agent {
      docker{image 'jenkins'}
    
  }
  stages {
    stage('CI') {
      steps {
        sh 'ls -al'
        sh "cd ${env.WORKSPACE}"
        sh 'ls -al'
      }
    }
  }
}
pipeline {
    agent any
    stages {
        stage('Example') {
            steps {
                 echo 'ERROR: oh no'
            }
        }
    }
   post { 
        always { 
            step([$class: 'LogParserPublisher', parsingRulesPath: '/Users/jraezrus/rules/rulesParser', useProjectRule: false])
        }
   }
}
*/

pipeline {
    agent any
   triggers { 
  cron('*/5 * * * *') 
  } 
  options{ 
buildDiscarder(logRotator(numToKeepStr:'10')) 
ansiColor('xterm') 
timestamps() 
} 
    stages {
        stage('Example') {
            steps {
                echo 'Hello World'
            }
        }
    }
}



