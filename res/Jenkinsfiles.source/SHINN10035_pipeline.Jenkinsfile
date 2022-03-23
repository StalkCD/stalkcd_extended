pipeline {
  agent any
  stages {
    stage('Information') {
      steps {
        sh 'php -v'
        sh 'composer -v'
      }
    }
    stage('Dependencies') {
      steps {
        sh 'composer install'
      }
    }
    stage('Artifacts') {
      steps {
        sh 'jar -cvf pipeline.war ./*'
        sh 'scp -r ./* root@39.106.218.120:/home/pipeline/'
      }
    }
  }
}
