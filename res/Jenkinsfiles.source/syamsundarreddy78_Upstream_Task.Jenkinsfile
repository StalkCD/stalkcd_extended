
properties([[$class: 'GithubProjectProperty', displayName: '', projectUrlStr: 'https://github.com/syamsundarreddy78/multibranch.git'],
            pipelineTriggers([upstream('Pipeline_Ci_Demo,Multibranch_demo/master')]) ])
pipeline {
    agent any
        stages {
            stage('Build') {
                when {
                    expression {
                        "foo" == "bar"
                    }
                }
                steps {
                    echo 'Building...'
                }
            }
        stage('Test') {
            when {
                environment name: 'JOB_NAME', value: 'foo'
            }
            steps {
                echo 'Testing.......'
            }
        }
        stage('Deploy') {
            when {
                branch 'master'
            }
            steps {
                echo 'Deploying....'
            }
        }
      }
}
