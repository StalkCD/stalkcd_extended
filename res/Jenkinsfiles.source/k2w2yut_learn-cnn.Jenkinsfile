//tutorial file for jenkins
//add another comment
//another comment
//we need to run jenkins pipeline

pipeline {
    agent { docker 'python' }
    stages {
        stage('build') {
            steps {
                bat  'python --version'
                bat  'echo "this is inside python"'
            }
        }
    }
}


// node('docker') {
//     checkout scm
//     stage('Build') {
//         docker.image('python:3.5.1').inside {
//             sh 'python --version'
//         }
//     }
// }



// pipeline {
//     agent { docker 'python:3.5.1' }
//     stages {
//         stage('build') {
//             steps {
//                 bat  'python --version'
//                 steps{
//                   retry(3){
//                     bat 'echo('testing jenkins echo')'
//                     bat 'echo('testing jenkins echo 2')'
//                     bat 'set'
//                   }
//                   timeout(time:3 unit: 'SECONDS'){
//                     bat 'i = 0'
//                     bat 'while true print i++'
//                   }
//                 }
//             }
//         }
//         stage('build2'){
//           steps{
//             bat 'echo(testing build 2)'
//           }
//         }
//         post{
//           always {
//             echo 'This will always run'
//           }
//           success {
//             echo 'This will run only if successful'
//           }
//           failure {
//             echo 'This will run only if failed'
//           }
//           unstable {
//             echo 'This will run only if the run was marked as unstable'
//           }
//           changed {
//             echo 'This will run only if the state of the Pipeline has changed'
//             echo 'For example, if the Pipeline was previously failing but is now successful'
//           }
//         }
//     }
// }
