pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
	wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) {
	  nodejs('NodeJS') {
	    sh 'echo Build stage'
	    sh 'npm install'
	    sh 'npm run build'
	    sh 'npm run test'
	  }
	}

	archiveArtifacts artifacts: 'public/**', fingerprint: true
	stash includes: "public/**", name: "project"
	      
        //script {
          //step ([$class: 'CopyArtifact', projectName: 'drum-machine-pipeline', filter: "public/index.html", target: 'DUCTEST']);
	//}
      }
    }
    stage('Deploy') {
      //agent { label: "master"}
      steps {
	sh 'echo Deploy stage'
	unstash "project"
        sshPublisher(publishers: [sshPublisherDesc(configName: 'docker-nginx-sshd', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: 'public', sourceFiles: 'public/**')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
	//sh 'ls -l public'
      }
    }
    stage('Integration tests') {
      //agent { label: "master"}
      steps {
	sh 'echo Integration tests stage'
	sh 'curl -i http://localhost:8081'
      }
    }
  }
}
