pipeline {
    agent {label 'ec2'}
    stages {
        stage("Build") {
            steps {
                sh './mvnw clean package -DskipTests'
            }
        }

        stage("Unit Tests") {
            steps {
                sh './mvnw test'
            }
        }

        stage("Docker build & run") {
            steps {
                sh './mvnw dockerfile:build dockerfile:push'
            }
        }

        stage("Docker push") {
            steps {
                sh 'docker run -p 9090:9090 -t otanikotani/demo:latest'
            }
        }
    }

    post {
        always {
            echo 'Pipeline has ended'
            archiveArtifacts '**/target/*.jar'
            junit('**/surefire-reports/**/*.xml')
        }
        success {
            echo 'The pipeline was successful'
        }
        failure {
            echo 'The pipeline failed'
        }
        unstable {
            echo 'The pipeline is unstable'
        }
        changed {
            echo 'The pipeline state has changed'
        }
    }
}