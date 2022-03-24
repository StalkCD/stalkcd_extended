// pipeline {
//     agent { docker 'maven:3.3.3' }
//     stages {
//         stage('build') {
//             steps {
//                 sh 'mvn --version'
//             }
//         }
//     }
// }
/*



pipeline {
    agent { docker 'maven:3.3.3' }
    stages {
        stage('build') {
            steps {
                sh 'docker info'
            }
        }
    }
}
https://hub.docker.com/_/openjdk/

hseeberger/scala-sbt
openjdk:8 java -version
*/

pipeline {
    agent {
        //docker { image 'openjdk:8' }
        docker { image 'hseeberger/scala-sbt:8u151-2.12.4-1.1.1' }
        
    }
    environment {
        DISABLE_AUTH = 'true'
        DB_ENGINE    = 'sqlite'
        // https://stackoverflow.com/questions/47327495/jenkins-2-0-running-sbt-in-a-docker-container?noredirect=1&lq=1
        JAVA_TOOL_OPTIONS = '-Dsbt.log.noformat=true -Dsbt.global.base=.sbt -Dsbt.boot.directory=.sbt -Dsbt.ivy.home=.ivy2'
        /*
sbt  clean test
        */
    }
    stages {
        stage('Dump') {
            steps {
                //sh 'printenv'
                sh 'printenv | sort'
            }
        }
        stage('Java') {
            steps {
                //sh 'sbt version'
                sh 'java -version'
            }
        }
        stage('Build') {
            steps {
                echo 'Building'
                sh '''
                    echo "Multiline shell steps works too"
                    ls -lah
                '''
            }
        }
        stage('Test') {
            steps {
                echo 'Testing'
                sh 'sbt test'
            }
        }
       stage('Deploy') {
            steps {
                echo 'Deploying'
                echo 'Run Smoketest'
            }
        }
 
        /*


        */
    }
    post {
        always {
            echo 'This will always run'
            //archiveArtifacts artifacts: 'build/libs/**/*.jar', fingerprint: true
            echo 'Collect Unit Test output'
            junit '**/target/test-reports/*.xml'
            deleteDir()
        }        
        success {
            echo 'This will run only if successful'
            /*
            slackSend channel: '#ops-room',
                        color: 'good',
                        message: "The pipeline ${currentBuild.fullDisplayName} completed successfully."            
            */
        }
        failure {
            echo 'This will run only if failed'
            mail to: 'emmanuel.idi@gmail.com',
                subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
                body: "Something is wrong with ${env.BUILD_URL}"            
        }
        unstable {
            echo 'This will run only if the run was marked as unstable'
        }
        changed {
            echo 'This will run only if the state of the Pipeline has changed'
            echo 'For example, if the Pipeline was previously failing but is now successful'
        }
    }    
}
