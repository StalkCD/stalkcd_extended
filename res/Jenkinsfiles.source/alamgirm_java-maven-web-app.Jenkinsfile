// Alamgir Mohammed
// Jenkins file for Build
// invoked by the Pipeline plugin of Jenkins
// This pipeline (1) clones git repo (2) builds the maven project  (3) builds a docker image with the built app
// (4) Pushes the docke image to docker hub.


env.DOCKERHUB_USERNAME='alamgirm'
//env.APPBUILD_ID="${BUILD_NUMBER}"
pipeline {
    //agent  any
     agent { 
         node { 
             label 'jkslave' //Jenkins Slave  
         } 
     }
    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/alamgirm/java-maven-web-app.git'
            }
        }
        
        stage('Build') { 
            steps {
                sh 'mvn -B -DskipTests clean package' 
            }
        }
        /*
        stage('Test') { 
            steps {
                sh 'mvn test' 
            }
            post {
                always {
                    junit 'target/surefire-reports/*.xml' 
                }
            }
        }
        */
        
        // Build docker iamge 
        stage('BuildDockerImage') {
             steps {
                //sh "docker build -t ${DOCKERHUB_USERNAME}/myapp:${BUILD_NUMBER}  ."
                 sh "docker build -t ${DOCKERHUB_USERNAME}/myapp:latest  ."
            }
        }
        
        // Push the built image
        stage('PushDockerImage') {
            steps {
                 withDockerRegistry([credentialsId: 'dockerhub', url: 'https://hub.docker.com/']) {
                     //sh "docker push ${DOCKERHUB_USERNAME}/myapp:${BUILD_NUMBER}"
                     sh "docker push ${DOCKERHUB_USERNAME}/myapp:latest"
                 }
            }
        }
    }
}
