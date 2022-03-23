pipeline{
agent any
  tools{
      maven 'maven-3'
      jdk 'Java-8'
  }
  stages{
    stage('Pipeline Test'){
        steps{
          echo 'Pipeline successfull...'
          sh 'whoami'
        }
    }
    stage('Maven Test'){
        steps{
            sh '''
            echo "PATH = ${PATH}"
            echo "M2_HOME = ${M2_HOME}"
            '''
        }
    }
    stage('Build'){
      steps{
          sh 'mvn clean install -DskipTests=true'
      }
    }
    stage('Test'){
      steps{
        sh 'mvn test'
      }
    }
    
  }
}
