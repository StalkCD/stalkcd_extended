pipeline {
        agent none
    stages {
        stage('Build'){
            agent any
	    steps{
                deleteDir()
	        checkout scm 
	       	}
	    }
		     
        stage('Docker') {
		    agent  {dockerfile true}
            steps {
                echo 'running dockerfile'
                junit 'python_tests_xml/*.xml'
                sh 'find . -maxdepth 1  -name "*.py" |xargs pycodestyle | tee pycodestyle.log'
                 }
        }
        stage('ansible'){
                    agent any
                    steps {
                    deleteDir()
                    checkout scm
                    sh 'git clean -d -f -i'
                    sh 'git remote set-url origin git@github.com:snehil1001/case2_pipeline.git'
                    sh 'chmod 777 .git/config'
                    sh '/home/ubuntu/anaconda3/bin/ansible-playbook -vvv /home/ubuntu/case2_pipeline/deploy.yml -i /etc/ansible/hosts'
                
                          }
                        }
               }

  }

