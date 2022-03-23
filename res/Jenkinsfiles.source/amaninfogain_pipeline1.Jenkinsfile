pipeline {
    agent any
	
	parameters {
        string(name: 'id', defaultValue: 'aman', description: 'Enter your name')
    }
  
     

libraries {
  lib('myvar@master')
}
     

    stages{
      stage('demo') {
          steps {
		  script{	  
                    hello.call "${params.id}"
		    sh 'pwd'
	          //  sh 'cp -rf /home/xavient/git/pipeline/data3 /home/xavient/git/pipeline/data2'	  
		  }
           }
        }
	    
      stage('deploy') {
	      environment {
        source =  '/home/xavient/git/pipeline/data4'
        target =  '/home/xavient/git/pipeline/data2'
      }
          steps {
		  
		  echo "${env.source}"
		  script{	  
                         
			  run.call ("${env.source}","${env.target}")
		  }
		  
	  }
      }
      }
}
