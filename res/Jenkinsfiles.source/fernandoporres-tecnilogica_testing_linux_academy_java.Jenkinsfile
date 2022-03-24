pipeline {

    // use agent none if each stage may be executed on differente nodes
    agent none

    stages {

        stage('Junit Test') {

            agent {
                label 'apache'
            }

            steps {
                sh 'ant -f test.xml -v'                
                junit 'reports/result.xml'
            }
        }

        stage('Build') {

            agent {
                label 'apache'
            }

            steps {
                sh 'ant -f build.xml -v'
            }

            // post build steps. Since we no longer use one node for the whole pipeline we should include it after build success
            post {
                // no matter what happens in any prior stage, we will always archive the jar file
                // always {
                success {
                    // any JAR file insise dist folder should be archived
                    archiveArtifacts artifacts: 'dist/*.jar', fingerprint: true
                }
            }


        }

        stage ('deploy') {

            agent {
                label 'apache'
            }

            steps {
                sh "mkdir -p /var/www/html/rectangles/all/${env.BRANCH_NAME}"
                sh "cp dist/rectangle_${env.BUILD_NUMBER}.jar /var/www/html/rectangles/all/${env.BRANCH_NAME}"
            }
        }

        stage ('Running on CentOS') {

            agent {
                label 'CentOS'
            }

            steps {
                sh "wget http://fernandoporres1.mylabserver.com/rectangles/all/${env.BRANCH_NAME}/rectangle_${env.BUILD_NUMBER}.jar"
                sh "java -jar rectangle_${env.BUILD_NUMBER}.jar 3 4"
            }

        }

        stage ('Testing on Debian') {

            agent {
                // docker 'openjdk:8u121-jre'
                label 'CentOS'
            }

            steps {
                sh "wget http://fernandoporres1.mylabserver.com/rectangles/all/${env.BRANCH_NAME}/rectangle_${env.BUILD_NUMBER}.jar"
                sh "java -jar rectangle_${env.BUILD_NUMBER}.jar 3 4"
            }

        }

        stage ('Promote to Green') {

            agent {
                label 'CentOS'
            }

            when {
                branch 'master'
            }

            steps {
                echo 'Promoting to Green'
                sh "cp /var/www/html/rectangles/all/rectangle_${env.BUILD_NUMBER}.jar /var/www/html/rectangles/green/rectangle_${env.BUILD_NUMBER}.jar"
            }

        }

        stage ('Promote development branch to master') {
            agent {
                label 'CentOS'
            }
            when {
                branch 'development'
            }
            steps {
                echo "Stashing any local changes"
                sh 'git stash'
                echo "Checking out development branch"
                sh 'git checkout development'
                echo 'Checking out the master branch'
                sh 'git checkout master'
                echo 'Merging development into master branch'
                sh 'git merge development'
                echo 'pushing to origin master'
                sh 'git push origin master'
            }
        }

    }

}