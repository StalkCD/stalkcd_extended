pipeline {
    agent any
    stages {
        /*stage("Compile") {
            steps {
                sh "./mvnw compile"
            }
        }
        stage("Unit test") {
            steps {
                sh "./mvnw test"
            }
        }
        stage("Couverture de code") {
            steps {
                sh "./mvnw jacoco:report"
                publishHTML  (target: [
                    reportDir: "target/jacoco-ut",
                    reportFiles: "index.html",
                    reportName: "JaCoCo Report"
                ])
                sh "./mvnw jacoco:check"
            }
        }
        stage("Analyse Satic du Code") {
            steps {
                sh "./mvnw checkstyle:checkstyle"
                publishHTML  (target: [
                    reportDir: "target/site",
                    reportFiles: "checkstyle.html",
                    reportName: "CheckStyle Report"
                ])
            }
        } */
        stage("Package") {
            steps {
                sh "./mvnw clean package -DskipTests"
            }
        }
        stage("Docker build") {
            agent {
                label 'jenkins-docker-slave'
            }
            steps {
                sh "docker build -t localhost:5000/calculator ."
            }
        }
        stage("Docker push") {
            agent {
                label 'jenkins-docker-slave'
            }
            steps {
                sh "docker push localhost:5000/calculator"
            }
        }
        stage("Deploy to staging") {
            agent {
                label 'jenkins-docker-slave'
            }
            steps {
                sh "docker run -d --rm -p 8765:8080 --name calculator localhost:5000/calculator"
            }
        }
        stage("Acceptance test") {
            steps {
                sleep 60
                sh "./acceptance_test.sh"
            }
        }
    }
    post {
        always {
            sh "docker stop calculator"
            //mail to: 'galibot59@gmail.com',
            //subject: "Pipeline Completer : ${currentBuild.fullDisplayName}",
            //body: "Votre construction est complété, vérifié SVP : ${env.BUILD_URL}"
        }
    }
}