pipeline {
  agent {
    node {
      label 'linuxSecondary'
    }
    
  }
  stages {
    stage('SCM') {
      agent {
        node {
          label 'linuxSecondary'
        }
        
      }
      steps {
        echo 'SCM pipeline starts here!'
        isUnix()
        svn(url: 'http://svn.maximus.com/svn/scmBuild/lods/dev_1.0.0', poll: true, changelog: true)
        build 'SCM/SCM_scmBuild'
        waitForQualityGate()
      }
    }
  }
}
