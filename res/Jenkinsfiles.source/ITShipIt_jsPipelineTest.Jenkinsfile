pipeline {
    agent any
    stages {
        stage('---clean---') {
            steps {
                sh "cd ~/"
                sh "ls"
                sh "cd ~/src/school/IT447/jsPipelineTest"


            }
        }
        stage('--Docker Image--') {
            steps {
                sh "docker build -t trevash/jspipelinetest ."
                sh "aws ecr batch-delete-image --repository-name js-pipeline-test --image-ids imageTag=recent"
                sh "docker tag jspipelinetest:latest 600253944034.dkr.ecr.us-west-2.amazonaws.com/js-pipeline-test:recent"
                sh "docker push 600253944034.dkr.ecr.us-west-2.amazonaws.com/js-pipeline-test:recent"
            }
        }
        stage('--Deploy--') {
            steps {
                sh "docker pull 600253944034.dkr.ecr.us-west-2.amazonaws.com/js-pipeline-test:recent"
                sh "docker run -d -p 4000:80 600253944034.dkr.ecr.us-west-2.amazonaws.com/js-pipeline-test:recent"
            }
        }
    }
}
