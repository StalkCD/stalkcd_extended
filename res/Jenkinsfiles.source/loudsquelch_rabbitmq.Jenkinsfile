#!/usr/bin/env groovy
pipeline {
    agent none
    stages {
        stage('Unit Tests') {
            agent {
                dockerfile {
                    filename 'test.Dockerfile'
                    dir 'services/project'
                }
            }
            steps {
                sh 'py.test --verbose --junit-xml test-reports/results.xml' 
            }
        }
        stage('Build') {
            agent { label 'docker' }
            steps {
                script {
                    node {
                        // checkout scm
                        def rabbitMQ = docker.build("rabbit-mq", "-f test.Dockerfile ./services/rabbitmq")
                        def projectApp = docker.build("project-app", "-f run.Dockerfile ./services/project")
                    }
                }
            }
        }
        // stage('Integration Tests') {
        //     agent any
        //     steps {
        //         rabbitMQ.withRun('-e RABBITMQ_DEFAULT_VHOST=barney"') { c ->
        //             rabbitMQ.inside("--link ${c.id}:mq") {
        //                 /* Wait until rabbit mq service is up */
        //                 sh 'while ! rabbitmqctl status; do sleep 5; done'
        //             }
        //             projectApp.inside("--link ${c.id}:mq") {
        //                 /*
        //                 * Run some tests which require MySQL, and assume that it is
        //                 * available on the host name `db`
        //                 */
        //                 sh 'python /usr/src/app/services/project/send.py'
        //             }
        //         }
        //     }
        // }
    }
    post {
        always {
            junit 'test-reports/results.xml' 
        }
    }
}

// // RECOMMANED STANDARD
// pipeline {
//     agent any

//     stages {
//         stage('Build') {
//             steps {
//                 echo 'Building'
//             }
//         }
//         stage('Test') {
//             steps {
//                 echo 'Testing'
//             }
//         }
//         stage('Deploy') {
//             steps {
//                 echo 'Deploying'
//             }
//         }
//     }
//     post {
//         always {
//             echo 'This will always run'
//         }
//         success {
//             echo 'This will run only if successful'
//         }
//         failure {
//             echo 'This will run only if failed'
//         }
//         unstable {
//             echo 'This will run only if the run was marked as unstable'
//         }
//         changed {
//             echo 'This will run only if the state of the Pipeline has changed'
//             echo 'For example, if the Pipeline was previously failing but is now successful'
//         }
//     }
// }

// https://issues.jenkins-ci.org/browse/JENKINS-46336?page=com.atlassian.jira.plugin.system.issuetabpanels%3Aall-tabpanel

// stages {
//     stage('Run Tests') {
//         parallel {
//             stage("RSpec") {
//                 agent { label 'docker' }
//                 steps {
//                 script {
//                     docker.image('postgres').withRun('-e POSTGRES_DB=xxxx_test') { container ->
//                     docker.build('netadmin-jenkins',' --build-arg http_proxy=$http_proxy --build-arg https_proxy=$https_proxy --build-arg no_proxy=$no_proxy -f Dockerfile.jenkins --pull .').inside("--link=${container.id}:postgres -e DATABASE_URL=postgresql://postgres:postgres@postgres:5432/xxxx_test") {
//                         withEnv(['DATABASE_URL=postgres://postgres@postgres:5432/','PGHOST=postgres','PGUSER=postgres','RAILS_ENV=test']) {
//                             sh 'yarn install'
//                             rake 'db:create'
//                             rake 'db:migrate'
//                             rake 'db:seed'
//                             rake 'spec'
//                         }
//                     }
//                     }
//                 }
//                 }
//                 post {
//                     always {
//                         junit '**/reports/*.xml'
//                     }
//                 }
//             }
//             stage("RuboCop") {
//                 agent {
//                     dockerfile {
//                         additionalBuildArgs '--pull --build-arg http_proxy=$http_proxy --build-arg https_proxy=$https_proxy --build-arg no_proxy=$no_proxy'
//                         filename 'Dockerfile.jenkins'
//                     }
//                 }
//                 steps {
//                     rake 'rubocop | tee rubocop.log'
//                 }
//                 post {
//                     always {
//                         warnings canResolveRelativePaths: false, failedTotalHigh: '0', healthy: '0', parserConfigurations: [[parserName: 'RuboCop', pattern: 'rubocop.log']], unHealthy: '100', unstableTotalAll: '0'
//                     }
//                 }
//             }