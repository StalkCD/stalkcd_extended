// pipeline {
//   agent any
//   environment {
//     target_cluster = '10.65.182.142'
//   }
//   stages {
//     stage('finish') {
//         agent any
//         steps {
//           script {

//             try {
//     //        build (job: 'finish_job', propagate: false)
//     //        build job: 'finish_job'
//               sh '''set +e

//         ssh root@$target_cluster -t "pytest -s /var/Nightswatch/jenkins_pipeline_tests/finish.py" '''
//               currentBuild.result = 'SUCCESS'
//             } catch(e) {
//               currentBuild.result = "FAILURE"
//             }
//         }
//       }
//     }


//     stage('print_target_cluster') {
//       agent any
//       steps {
//         sh '''echo $target_cluster'''

//       }
//     }

//   }
// }

def target_cluster = "10.65.182.142"

def BuildJob(projectName) {
    try {
       stage(projectName) {
         node {      
           def res = build job:projectName, propagate: false
           result = res.result

           if (result.equals("SUCCESS")) {
           } else {
              error 'FAIL' //sh "exit 1" // this fails the stage
           }
         }
       }
    } catch (e) {
        currentBuild.result = 'UNSTABLE'
        result = "FAIL" // make sure other exceptions are recorded as failure too
    }
}

node {
    BuildJob('finish_job')
    stages {
      stage('print_target_cluster') {
        agent any
        steps {
          sh '''echo $target_cluster'''

        }
      }
    }
}