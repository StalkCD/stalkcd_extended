pipeline {
    agent none
    
        stages {

            stage(‘Build’) {
                agent {
                    //label 'node1-neelu'
                    label 'build'
                }
                steps {
                        //echo ‘Building..’
                        sh '/media/usb/CYELP/first.sh'
                        }
                    }
            stage(‘Test’) {
                agent {
                   label 'build'
                }
                steps {
                        //echo ‘Testing..’
                        sh '/media/usb/CYELP/first.sh'
                    }
                }

            stage(‘Deploy’) {
                agent {
                        //echo ‘Testing..’
                   label 'build'
                }
                steps {
                        //echo ‘Deploying….’
                        echo 'hey man done complete'
                        
                        }
                    }

        }
}
