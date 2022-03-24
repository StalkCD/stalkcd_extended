pipeline {
	// Assumed that 
	// - this pipeline will use Docker on Windows so agent must support Windows containers	
	// - latest changes are fetched already by Jenkins pipeline plugin along with that file	
	// - clean-up is done on fetch by Jenkins pipeline so no old files kept
    agent any
		parameters {
        string(name: 'CLIENT_DIR', defaultValue: 'webrtc-proxy', description: 'Directory containing sources and build scripts for WebRTC client')
		string(name: 'MYDIR', defaultValue: 'mydir', description: 'Directory containing sources and build scripts for WebRTC client')
    }
    stages {
        stage('Build') {
            steps {
			
				echo "${params.CLIENT_DIR}"
				echo "${params.MYDIR}"

			}
        }
    }
}