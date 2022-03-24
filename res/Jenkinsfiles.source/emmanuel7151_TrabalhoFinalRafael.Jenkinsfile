pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'mvn clean install'
      }
    }
    stage('Docker') {
      agent any
      steps {
        sh '''docker login -u emmanuel171 -p alienwar100


touch $JENKINS_HOME/MariaDB/my.cnf
cd $WORKSPACE/target
mv Trabalho_Final-1.0-SNAPSHOT.war Trabalho_Final.war
rm -rf $JENKINS_HOME/Tomcat/ROOT/*
mv * $JENKINS_HOME/Tomcat/ROOT/
'''
      }
    }
    stage('Docker Images') {
      parallel {
        stage('Aplication') {
          steps {
            sh '''cd $JENKINS_HOME/Tomcat
docker build -t $DOCKERUSER/$APLICATION_NAME  .'''
          }
        }
        stage('Database') {
          steps {
            sh '''cd $JENKINS_HOME/MariaDB

docker build -t $DOCKERUSER/$DATABASE  .'''
          }
        }
      }
    }
    stage('Enviar Imagens') {
      parallel {
        stage('Enviar Tomcat') {
          steps {
            sh 'docker push $DOCKERUSER/$APLICATION_NAME'
          }
        }
        stage('ENVIAR DATABASE') {
          steps {
            sh 'docker push $DOCKERUSER/$DATABASE'
          }
        }
      }
    }
  }
  environment {
    DOCKERUSER = 'emmanuel171'
    DOCKERPASS = 'alienwar100'
    DATABASE = 'mariadb'
    APLICATION_NAME = 'trabalhofinalrafael'
  }
  post {
    failure {
      mail(to: 'manubibizinho@gmail.com', subject: "Failed Pipeline: ${currentBuild.fullDisplayName}", body: "Something is wrong with ${env.BUILD_URL}.")
      
    }
    
    success {
      mail(to: 'manubibizinho@gmail.com', subject: "Successed Pipeline: ${currentBuild.fullDisplayName}", body: "${env.BUILD_URL} was successefully build.")
      
    }
    
  }
}
