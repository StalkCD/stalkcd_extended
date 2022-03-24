/**
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
**/
/**
@Library('pilipa-library') _
import org.foo.Utilities
def utils = new Utilities(this)
pipeline {

    agent any
    environment {
        CC = 'clang'
    }
    triggers {
    }

    stages {
        stage('main') {
            steps {
                sh "echo foo"
                buildProject()
                utils.mvn 'clean package'
            }
        }
        
        stage('Example') {
            environment {
                AN_ACCESS_KEY = credentials('${my-prefined-secret-text}')
            }
            steps {
                sh 'printenv'
            }
        }
    }
    post {
        always {
            echo 'I will always say Hello again!'
        }
    }

}
**/

@Library('pilipa-library') _
import org.foo.Zot

evenOrOdd(currentBuild.getNumber())
node{
    
    z = new Zot()
    z.checkOutFrom('test')
    log.info 'Starting'
    log.warning 'Nothing to do!'
}

/**
pipeline {
    agent any
    stages {
        stage('Example Build') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Example Deploy') {
            when {
               not {
                    branch 'master'
                }
            }
            steps {
                echo 'Deploying'
            }
        }
    }
}
**/
