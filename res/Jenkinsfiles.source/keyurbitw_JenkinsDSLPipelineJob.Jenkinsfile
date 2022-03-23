pipeline {
    agent {
        node {
            label 'autonomy_gpullautonomy_gpu_reno'
        }
    }
    environment {
        def DIST_NUM=0
        def DIST_TOTAL=0
        def BUILD_CONFIG="./autonomy/tools/pipeline/zahn/build_master.yml"
		def ZAHN_STAGES="config build test python_test install tar test_tar"
    }
    stages {
        stage ('Clone Script Repos. ') {
            steps {
                sh 'set -xe && pushd .'
				
                sh 'rm -rf ${WORKSPACE}/bnr-dependencies && mkdir -p ${WORKSPACE}/bnr-dependencies && cd ${WORKSPACE}/bnr-dependencies'
				sh 'git clone --depth=1 ssh://gerrit.org.apple.com:29418/bnr/dependencies .'
				
				sh 'rm -rf ${WORKSPACE}/automony-pipeline && mkdir -p ${WORKSPACE}/automony-pipeline && cd ${WORKSPACE}/automony-pipeline'
				sh 'git clone --depth=1 ssh://gerrit.org.apple.com:29418/a/automony-pipeline .'
				
				sh 'popd'
            }
        }
		
		stage ('Run jenkins_job.sh Script'){
			steps {
				sh 'pip install docker==2.6.1'\
				sh 'cd ${WORKSPACE} && ls -al && ./autonomy-pipeline/jenkins_job.sh'
				}
			}
		}
    }
}
