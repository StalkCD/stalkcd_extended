pipeline {
  agent any
  // agent {
  //   docker {
  //         image 'node:6-alpine'
  //         args '-p 3000:3000'
  //       }
  //   }
    environment {
      CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
              nodejs('testJS') {
                sh "npm install"
                sh "npm start &"
              }
                // echo 'Attempting to run.'
                // sh "npm install"
                // sh "npm start &"

            }
        }
        stage('Test') {
            steps {
                echo 'Testing.. and stuff'
                nodejs('testJS') {
                    sh "npm test"
                }

                // sh "npm test"
            }
        }
        // stage('Deploy') {
        //     steps {
        //         echo 'Deploying....'
        //     }
        // }
    }
}

// how does this change things
// pipeline {
//     agent any
//     stages {
//         stage('Build') {
//             steps {
//                 echo "building..."
//             }
//         }
//         stage('Test'){
//             steps {
//                 sh ''
//                 junit 'reports/**/*.xml'
//             }
//         }
//         stage('Deploy') {
//             steps {
//                 sh 'make publish'
//             }
//         }
//     }
// }
