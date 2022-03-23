#!groovy
pipeline {
	//agent指定jenkins从哪里以及如何执行pipeline
    agent any
    
    //看定义在那一层，就只针对那一层起作用(pipeline一层针对pipeline。stage一层针对特定stage)
    environment {
    	UNITY_PROJECT_PATH = 'E:\\TonyTang\\Work\\Projects\\TGame_code'
    }

    stages {
		stage('postprocess'){
			steps{
				echo 'postprocess'
				echo UNITY_PROJECT_PATH
				//env是jenkins定义的全局的环境变量
				//http://localhost:8080/job/TonyTangPipeline/pipeline-syntax/globals
				echo env.WORKSPACE
			}
		}
        stage('build') {
            steps {
				bat 'TonyTangPipeline'
            }
        }
		stage('deploy'){
			steps{
				echo 'deploy'
				bat 'python FirstPython.py'
			}
		}
    }

    //Pipeline执行完之后执行，做一些clean up操作
    post {
    	//根据pipeline的结果做特定操作
    	always{
    		echo 'Always!'
    	}
        success {
        	echo 'Success!'
        }
        failure{
        	echo 'Failed!'
        }
    }
}

