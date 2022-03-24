pipeline {
   agent none
   stages {
      stage('Staging Deployment Setup') {
         agent any
         when {
            branch 'staging'
            beforeAgent true
         }
         steps {
            echo 'Create Release Pack' 
            sh 'tar czvf release.tgz README.md components.yaml'
            
            // archiveArtifacts artifacts: 'release.tgz'
            gateProducesArtifact file: 'components.yaml'
         }
      }
      stage('Deploy') {
         agent any
         when { 
            beforeAgent true
            not { branch 'pr*' } 
         }
         steps {
            echo 'Deployment'
            gateConsumesArtifact file: 'components.yaml'
         }
      }
   }
}
