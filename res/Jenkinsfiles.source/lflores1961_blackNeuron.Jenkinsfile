pipeline {
  agent any
  stages {
    stage('First') {
      agent any
      steps {
        echo 'Primer Pipeline'
        mail(subject: 'Primer Pipeline', body: 'Este es un mensaje desde Jenkins', from: 'fernando.flores1961@gmail.com', to: 'luis.fernando.flores.oviedo@gmail.com')
      }
    }
  }
}