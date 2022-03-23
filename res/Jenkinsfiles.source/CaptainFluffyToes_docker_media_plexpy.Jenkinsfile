pipeline {
    agent none

    triggers {
        pollSCM('H * * * *')
    }

    stages {
        stage ('Build dockerfile with docker agent') {
            agent { dockerfile true}
            steps {
                sh 'cat /etc/hostname'
            }
        }
        stage ('Remove dangling images') {
            agent any
            steps {
                sh 'cat /etc/hostname'
                sh 'docker image rm $(docker image ls -aq)'
            }
        }
    }
}