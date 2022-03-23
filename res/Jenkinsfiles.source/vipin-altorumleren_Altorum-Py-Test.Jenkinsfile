pipeline {
    
    agent { docker { image 'python:3.5.1' } }
    stages {
        stage ('Build') {
        // for python projects
        //sh 'pipenv'
            steps {

            sh "pip install -r requirements.txt"
            }
        }
        //stage ('Test') {
            //steps {
                //sh "pytest"  // for python projects
            //}

        //}
        stage ('Run'){
            
            steps{

                sh "python3 pyscript.py"
            }
            

        }

    }
    post {
    always {
       emailext body: 'Python_Pipeline', subject: 'Python_Test_Pipeline', to: 'vipinmaurya2293@gmail.com'
    }
}

}


