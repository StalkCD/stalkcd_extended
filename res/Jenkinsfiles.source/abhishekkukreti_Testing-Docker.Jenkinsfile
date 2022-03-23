/* pipeline {
  agent {
  docker { image 'node:7-alpine' }
  }
  stages{
    stage('Test'){
      steps {
        sh 'node --version'
      }
    }
  }
}
//Scripted //
node {
  checkout scm
  docker.image('node:7-alpine').inside {
    stage('Check') {
     sh 'node --version' 
          }
  }
}


node {
    checkout scm

    def customImage = docker.build("my-image:test")

    customImage.inside {
        sh 'make test'
    }
}
*/
pipeline {
    agent any
    parameters {
        string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')

        text(name: 'BIOGRAPHY', defaultValue: '', description: 'Enter some information about the person')

        booleanParam(name: 'TOGGLE', defaultValue: true, description: 'Toggle this value')

        choice(name: 'CHOICE', choices: ['One', 'Two', 'Three'], description: 'Pick something')

        password(name: 'PASSWORD', defaultValue: 'SECRET', description: 'Enter a password')

        file(name: "FILE", description: "Choose a file to upload")
    }
    stages {
        stage('Example') {
            steps {
                echo "Hello ${params.PERSON}"

                echo "Biography: ${params.BIOGRAPHY}"

                echo "Toggle: ${params.TOGGLE}"

                echo "Choice: ${params.CHOICE}"

                echo "Password: ${params.PASSWORD}"
            }
        }
    }
}

/*pipeline {
 agent none
  
  stages {
    stage('front-end'){
      agent {
        docker {image 'maven:3-alpine'} 
      }
          steps {
            sh 'mvn --version' 
                    }
      }
    
    stage('Back-end'){
      agent {
        docker { image 'node:7-alpine'}
       }
      steps {
       sh 'node --version' 
        sh 'hostname'
      }
    }
    }
  }
*/

