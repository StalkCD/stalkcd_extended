// pipeline {
//   agent {
//     docker {
//       image 'node:8-alpine'
//       args '-p 3000:3000'
//     }
//   }

//   stages {
//     stage('Build') {
//       steps {
//         sh 'npm install'
//         sh 'npm install -g jest'
//       }
//     }
//     stage('Test') {
//       steps {
//         sh 'jest'
//       }
//     }
//   }

//   post {
//     always {
//       echo "I'm done come and get me"
//     }
//     success {
//       echo "Test completed successfully"
//       deleteDir()
//       mail to: 'victoryjames@witts-stratts.com',
//             from: 'victoryjames@witts-stratts.com',
//             subject: "Build succeeded ${currentBuild.fullDisplayName}",
//             body: "We are live in production. with ${env.BUILD_URL}"
//     }
//     failure {
//       echo "Error completing test"
//     }
//   }
// }

// pipeline {
//   agent any
//   environment {
//     CC = 'clang'
//   }

//   // Added parameter
//   parameters {
//     string(name: 'Greeting', description: 'How should I greet the world?')
//   }

//   stages {
//     stage('Example') {
//       environment {
//         DEBUG_FLAG = '-g'
//       }
//       steps {
//         sh 'printenv'
//       }
//     }

//     // stage('Test') {
//     //   echo "I'm done testing"
//     // }
//   }

//   post {
//     always {
//       junit '**/target/*.xml'
//     }
//     success {
//       echo "${env.CurrentBuild}"
//       echo "${env.CC}"
//       mail to: 'Victory James Ugwudike <victoryjames@witts-stratts.com>',
//           from: 'infrastructure@witts-stratts.com',
//           subject: 'New Updated build',
//           body: "This is the new update. ${env.CC}. Hello ${params.Greeting} World!"
//     }
//   }
// }

// pipeline {
//   agent none
//   stages {
//     stage('Build') {
//       agent any
//       steps {
//         checkout scm
//         sh 'make'
//         stash includes: '**/target/*.jar', name: 'app'
//       }
//     }

//     parallel {
//       stage('Test on Linux') {
//         agent {
//           label 'linux'
//         }
//         steps {
//           untash 'app'
//           sh 'make check'
//         }
//         post {
//           always {
//             junit '**/target/*.xml'
//           }
//         }
//       }

//       stage('Test on Windows') {
//         agent {
//           label 'windows'
//         }
//         steps {
//           unstash 'app'
//           bat 'make check'
//         }
//         post {
//           always {
//             junit '**/target/*.xml'
//           }
//         }
//       }
//       }
//   }
// }


// Back to our tests
pipeline {
  agent any

   stages {
    stage('All of the above') {
    parallel {
      stage('Staging - Build') {
        agent {
          docker {
            image 'node:9-alpine'
            args '-p 3000:3000'
          }
        }

        steps {
          sh 'npm install && npm install -g jest'
          sh 'node --version'
          sh 'jest'
        }
      }
      stage('Staging - Production') {
        agent {
          docker {
            image 'node:6-alpine'
            args '-p 3010:3000'
          }
        }

        steps {
          sh 'npm install && npm install -g jest'
          sh 'node --version'
          sh 'jest'
        }
      }
    }
    }
  }
}