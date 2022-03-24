// A parallel build pipeline.
pipeline {
	agent none
	stages {
		stage('Stage one') {
			parallel {
				"node 1": {
					node {
						// Run commands here -- maybe output the hostname and then run a Docker container
						sh 'echo "Job 1 running on node $(cat /etc/machine-id)"'
						agent {
							docker {
								image 'alpine:latest'
							}
						}
					}
				}
				"node 2": {
					node {
						// Run commands here -- maybe output the hostname and then run a Docker container
						sh 'echo "Job 2 running on node $(cat /etc/machine-id)"'
						agent {
							docker {
								image 'alpine:latest'
							}
						}
					}
				}
				"node 3": {
					node {
						// Run commands here -- maybe output the hostname and then run a Docker container
						sh 'echo "Job 3 running on node $(cat /etc/machine-id)"'
						agent {
							docker {
								image 'alpine:latest'
							}
						}
					}
				}
			}
		}
	}
}