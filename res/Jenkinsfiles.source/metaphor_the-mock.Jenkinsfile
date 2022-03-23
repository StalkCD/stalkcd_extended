pipeline {
    agent {
        label 'sbux-ci-agent-1 || sbux-ci-agent-2'
    }

    environment {
        CODE_URL = 'https://github.com/metaphor/the-mock.git'
        CREDENTIAL_ID = 'd039fbd0-b5da-47ba-a771-4374f4d3f71d'
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: "${env.CREDENTIAL_ID}", url: "${env.CODE_URL}"
            }
        }

        stage('Deploy DEV'){
            steps {
                sh 'ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -i ./pipeline/ansible/dev ./pipeline/ansible/deploy.yml -v'
            }
        }

        stage('Deploy QA'){
            steps {
                sh 'ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -i ./pipeline/ansible/qa ./pipeline/ansible/deploy.yml -v'
            }
        }
    }
}
