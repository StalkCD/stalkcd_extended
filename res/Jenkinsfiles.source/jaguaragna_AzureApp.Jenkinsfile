pipeline {
   agent any
    options {
        timeout(time: 10, unit: 'MINUTES') 
    }
   stages{
        stage ('Get image from Dev ') {
            agent any
            steps {
                echo 'Git Pull'
            // choose between folder trigger build and DROPS build pipeline triggered
            }
        }
        stage ('DropsServer Import ') {
           steps {
               drops application: '2', credentials: 'DROPSServer', environment: '1', importEnabled: true, importExecutions: [[component: '5', path: '', strategy: '2']], process: '', release: '1', releaseDescription: '', startAutomatically: true, url: 'http://192.168.99.103:5252/'
               
           }
        }
        stage ('DropsServer Docker Build and Deploy') {
           steps {
              drops application: '2', credentials: 'DROPSServer', deployEnabled: true, environment: '1', process: '1', release: '1', releaseDescription: '', url: 'http://192.168.99.103:5252/'
           }
        }
        stage ('tests App') {
            agent any
            steps {
                sh 'curl http://192.168.99.103:83'
             }
        }
    }
}
