pipeline {
    agent none
    stages {
        stage('Build') {
            agent {
                dockerfile {
                    dir 'dockerfile_meteor'
                }
            }
            steps {

                // El build de Meteor no debe hacerse como root. Se utiliza el usuario 'meteor'
                // Jenkins descarga el codigo fuente como root, por lo que hay que cambiar el owner a 'meteor' para poder hacer el build
                // Es preciso instalar dependencias antes del build. No hacerlo haría que el build no incluyese Babel y fallase al desplegarlo en node
                // Se utiliza el path completo de Meteor porque el ENV del dockerfile parece no funcionar

                sh '''
                   echo "Building Stage"
                   hostname
                   pwd
                   rm -f meteor_pipeline.tar.gz
                   chown meteor:meteor -R .
                   ls -la
                   su meteor -c "/home/meteor/.meteor/meteor npm install"
                   su meteor -c "/home/meteor/.meteor/meteor build ."
                   ls -la
               '''
            }
             post {
                success { echo 'Build OK' }
                failure {
                    echo 'Build FAILED'
                    mail to: 'darce@i3m.upv.es',
                             subject: "${currentBuild.fullDisplayName} - Build FAILED",
                             body: "${env.BUILD_URL}"
                }
            }
        }
        stage('Test') {
            agent {
                dockerfile {
                    dir 'dockerfile_node'
                    args '-p 3000:3000 --entrypoint ""'
                }
            }
            steps {
                sh '''
                    echo "Testing Stage"
                    hostname
                    pwd
                    node --version
                    pm2 --version
                    tar -xvzf meteor_pipeline.tar.gz > /dev/null
                    cd bundle/programs/server
                    npm install
                    cd ../../..
                    pm2 start app.json
                    sleep 3
                    pm2 status
                    succeed=$(pm2 status | grep online | wc -l)
                    pm2 stop 0 > /dev/null
                    pm2 delete 0 > /dev/null
                    rm -rf bundle/ out.log error.log
                    if [ "$succeed" -gt 0 ]
                    then exit 0
                    else exit -1
                    fi
                '''
            }
            post {
                success  { echo 'Test OK' }
                unstable { echo 'Test UNSTABLE' }
                failure  {
                    echo 'Test FAILED'
                    mail to: 'darce@i3m.upv.es',
                             subject: "${currentBuild.fullDisplayName} - Test FAILED",
                             body: "${env.BUILD_URL}"
                }
            }

        }
        stage('Deploy') {
            agent any
            steps {

                // https://medium.com/@weblab_tech/how-to-publish-artifacts-in-jenkins-f021b17fde71

                sh '''
                    echo echo "Deploying Stage"
                    hostname
                    pwd
                    ls -la /root/.ssh/
                    scp -o "StrictHostKeyChecking no" -i /root/.ssh/id_rsa meteor_pipeline.tar.gz runApp.sh app.json darce@158.42.105.207:/home/darce/nodejs_data/
                    ssh darce@158.42.105.207 -o "StrictHostKeyChecking no" -i /root/.ssh/id_rsa  chmod +x /home/darce/nodejs_data/runApp.sh
                    ssh darce@158.42.105.207 -o "StrictHostKeyChecking no" -i /root/.ssh/id_rsa ls -la /home/darce/nodejs_data
                    ssh darce@158.42.105.207 -o "StrictHostKeyChecking no" -i /root/.ssh/id_rsa docker restart nodejs
                '''

            }
            post {
                success  {
                    echo 'Deploy OK'
                    mail to: 'darce@i3m.upv.es',
                             subject: "${currentBuild.fullDisplayName} - Deploy OK",
                             body: "Job -> ${env.BUILD_URL}\nWeb -> http://158.42.105.207:3000"
                }
                failure  {
                    echo 'Deploy FAILED'
                    mail to: 'darce@i3m.upv.es',
                             subject: "${currentBuild.fullDisplayName} - Deploy FAILED",
                             body: "${env.BUILD_URL}"
                }
            }
        }
    }

}