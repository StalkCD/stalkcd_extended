#!/usr/bin/env groovy
/*
 From here: https://jenkins.io/doc/book/pipeline/
      here: https://github.com/jenkinsci/pipeline-plugin/blob/master/TUTORIAL.md
  and here: https://wilsonmar.github.io/jenkins2-pipeline/#jenkins2-highlights
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
        stage('Build') { 
            steps { 
                echo '\u2776 Stage 1 - Build'
                echo "\u2600 BUILD_URL=${env.BUILD_URL}"
            }
        }
        stage('Test'){
            steps {
                echo "\u2777 Stage 2 - Test"
                script {
                  def workspace = pwd()
                  echo "\u2600 workspace=${workspace}"
                }
            }
        }
        stage('Deploy') {
            steps {
                echo '\u2778 Stage 3 - Deploy'
		
                echo "Hello ${params.PERSON}"

                echo "Biography: ${params.BIOGRAPHY}"

                echo "Toggle: ${params.TOGGLE}"

                echo "Choice: ${params.CHOICE}"

                echo "Password: ${params.PASSWORD}"
            }
        }
    }
}
