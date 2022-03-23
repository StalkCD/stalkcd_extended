pipeline {
    /*
    * OK I GOT IT: MY JENKINS RUN IN HOST ENV >>> CANT START DOCKER IN DOCKER
    * Jenkins can run under 'docker' in HOST, or run directly inside HOST
    * agent here MUST ANY, not
    * agent { docker 'node:6.12'} >>> ERR
    * OK OK OK, i can get it (docker)
    * By install 'Docker Plugin'
    * ========================
    * Do i have node?
    * Yes, 'node' of HOST ENV
    * ========================
    * Which aws credential used?
    * Find in ~/.aws of HOST ENV
    */
    agent any
    stages {
        stage('Test') {
            steps {
                sh '''
                    # whoami
                    # whoami ERR
                    # whoami: cannot find name for user ID 112

                    # sudo npm install -g serverless
                    # sudo ERR
                    # sudo: not found
                    # npm install -g serverless
                    # serverless --version

                    # Check ENV version of node/npm/nvm, current user
                    pwd
                    echo ~jenkins
                    whoami
                    node -v
                    npm -v

                    # Run it
                    npm install
                    npm run deploy
                '''
            }
        }
    }
    post {
        success {
            echo 'This will run only if successful'
        }
        failure {
            echo 'Failed.'
        }
        unstable {
            echo 'This will run only if the run was marked as unstable'
        }
        changed {
            echo 'This will run only if the state of the Pipeline has changed'
            echo 'For example, if the Pipeline was previously failing but is now successful'
        }
    }
}