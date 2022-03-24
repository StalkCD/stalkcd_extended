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
                    sh '/home/ubuntu/anaconda3/bin/ansible-playbook -vvv /home/ubuntu/case2/my_new_docker_build/deploy.yml -i /etc/ansible/hosts'
                
                          }
                        }
               }

  }

