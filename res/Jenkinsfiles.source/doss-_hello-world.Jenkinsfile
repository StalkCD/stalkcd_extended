pipeline {
//    agent { docker { image 'ruby' } }
    agent any
    stages {
        stage('build') {
            steps {
		script {
		 try {
			sh './test.sh'
		 } catch (err) {
			echo err
		 }
		}
		sh '''
			echo started multiline step
                	ruby --version
			echo completed multiline step
		'''
		sh 'ruby ri20min.rb'
            }
        }
        stage('tests') {
	   steps {
		sh 'rspec --format RspecJunitFormatter --out rspec.xml ri20min_spec.rb'
	   }
	}
    }
    post {
	always {
		echo "this runs always"
		junit 'rspec.xml'
	}
	success {
		echo 'this runs on success'
	}
	failure {
		echo 'this runs on failuer'
	}
	unstable {
		echo 'This will run only if the run was marked as unstable'
	}
	changed {
        	echo 'This will run only if the state of the Pipeline has changed'
	        echo 'For example, if the Pipeline was previously failing but is now successful'
	}
    }
}
