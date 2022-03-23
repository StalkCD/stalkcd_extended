// pipeline {
//     agent { docker 'python:3.5.1' }
//     stages {
//         stage('build') {
//             steps {
//                 sh 'python --version'
//             }
//         }
//     }
// }

pipeline {
    agent { dockerfile true }
    stages {
        stage('build') {
            steps {
                sh 'g++ main.cpp'
            }
        }
    }
}