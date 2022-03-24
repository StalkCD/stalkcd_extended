pipeline {
    agent { label params.AGENT_LABEL } // if you don't have other steps, 'any' agent works
    stages {
        stage('Stage 1') {
            agent {
                dockerfile {
                  label params.AGENT_LABEL  // both label and image
                  dir params.DOCKER_DIR
                }
            }
            steps {
                sh 'uname -a'
                sh 'touch test.txt'
                sh 'echo "foo" > test.txt'
            }
        }
        stage('Stage 2') {
            agent {
              dockerfile {
                label params.AGENT_LABEL  // both label and image
                dir params.DOCKER_DIR
              }
            }
            steps {
                sh 'uname -a'
                sh 'cat test.txt'
                sh 'rm test.txt'
            }
        }
    }
}
