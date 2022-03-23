#!groovy

pipeline{

    agent any

    /*
    Im falle von Docker compose kann über agent{ docker { label : "name" costumWorkspace "/.../..."}} eingestellt werden um
    den Workspace zu ändern der benutzt werden muss. gleiche funktioniert mit node stadt docker (docker durch node ersetzten).
    Run the Pipeline or individual stage this agent is applied to within this custom workspace, rather than the default.
    It can be either a relative path, in which case the custom workspace will be under the workspace root on the node, or an absolute path.
    label defines a available environment in witch the stage ore agent is executed. z.b. den namen des Docker images usw.
    */

    stages {
        stage("clean") {
            steps {
                sh "./gradlew clean"
            }
        }
        stage("Build") {
            steps {
                sh "./gradlew build"
            }
        }
        /*
        stage("Test") {
            steps {
                sh "./Test..."
            }
        }
        stage("fatJar") {
            steps {
                sh "./gradle fatJar"
            }
        }
        stage('Deploy'){
            when {
                allOf {
                    branch 'master'; expression {currentBuild.result == null || currentBuild.result == 'SUCCESS'}
                }
            }
            steps {
                sh "./deploy"
            }
        }*/
    }
    post {
        always {
            echo "Pipline wurde durchloffen und deployed"
        }
    }


}