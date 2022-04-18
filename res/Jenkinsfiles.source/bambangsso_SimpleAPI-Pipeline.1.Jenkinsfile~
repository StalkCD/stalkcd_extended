pipeline {
  agent any
    
  tools {nodejs "NodeJS 10.8.0"}
    
  stages {
        
    stage('Mulai Install dependencies') {
      steps {
        sh 'npm install'
      }
    }
     
    stage('Mulai Unit Test') {
      steps {
         sh 'npm test'
      }
    }

    stage('Mulai Deploy ke Staging') {
      steps {
         sh 'ssh jenkins@10.140.0.3 "rm -fR SimpleAPI-Pipeline && mkdir SimpleAPI-Pipeline"'
	 sh 'scp -r . jenkins@10.140.0.3:/home/jenkins/SimpleAPI-Pipeline'
         sh 'ssh jenkins@10.140.0.3 "sleep 10 && cd SimpleAPI-Pipeline && ls -la && pm2 start index2.js &&  sleep 1 && exit"'
      }
    }

    stage('Notifikasi Hasil ke Telegram') {
      steps {
	sh "curl -i -X GET 'https://api.telegram.org/bot663264986:AAH2cQ8bgVdkslwG9jGwEAmJZ2nt--baO4A/sendMessage?chat_id=139934550&text=halo%20halo'"
      }
    }
  }
}


