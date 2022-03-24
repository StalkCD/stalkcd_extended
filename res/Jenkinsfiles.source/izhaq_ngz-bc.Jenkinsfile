import java.text.SimpleDateFormat


//*********************************** Change for each project ************************************************************************************************************************************
applicationName = 'billed-charges-ui'		//Same name as in pom.xml

groupId 		= 'com.amdocs.microapps'					//Same groupid as in pom.xml

applicationType = 'ui'										//'api'		- for API projects
															//'ui'		- for UI projects
															//'api-lib' - for any API library like client,security,cache...
															//'ui-lib' 	- for any UI library like microapps-libs

envsToDeploy = 'PCFOPET-B' 					//https://bitbucket.service.edp.t-mobile.com/projects/BILLING_MICROAPP/repos/jenkinsbuild/browse/environments.yaml
//************************************************************************************************************************************************************************************************








//******************************* DONT CHANGE *****************************************************************************************************************************************************

props = ''
environments = ''
branchName = env.BRANCH_NAME.toLowerCase()
pipelineShared = ''
myAppSharedCodeRepo = 'ssh://git@bitbucket.service.edp.t-mobile.com:7999/billing_microapp/jenkinsbuild.git'

pipelineSharedFolderName = 'pipeline-shared'
sharedFilesStashName = 'shared-pipeline-files'
environmentsYamlFile = 'environments.yaml'
pcfDeployScriptFile = 'pcfDeployScript.sh'
sharedPipelineFile = 'pipelineShared.groovy'
projectYamlFile = "projectShared.yaml"

projectYamlFileLocation = "${pipelineSharedFolderName}/${projectYamlFile}"
environmentsYamlFileLocation = "${pipelineSharedFolderName}/${environmentsYamlFile}"
sharedPiplineFileLocation = "${pipelineSharedFolderName}/${sharedPipelineFile}"
pcfDeployScriptLocation = "${pipelineSharedFolderName}/${pcfDeployScriptFile}"

pipeline{
  agent none //WE DO NOT NEED A JENKINS BUILD AGENT YET

  options{
    skipDefaultCheckout()
    timestamps()
  }

  stages{
    stage('Setup'){
      steps{
        script{

		  node('mesos'){
            setupPipelineShared(projectYamlFile)
            pipelineShared = load sharedPiplineFileLocation
          }

          pipelineShared.runBuildPipeline()
        }
      }
    }
  }
}



//******************************* FUNCTION DECLARATIONS *****************************************************************************************************************************************************
def setupPipelineShared(projectYamlFile){  //CLEAN JENKINS WORKSPACE, CLONE CENTRAL GIT REPOSITORY AND READ PROJECT-[APP_NAME].YAML FILE
  cleanWs notFailBuild: true //CLEAN WORKSPACE
  library 'privateNPE'
  dir(pipelineSharedFolderName){ //CLONE REPO INTO A FOLDER NAMED pipeline-shared ON JENKINS WORKSPACE
    git credentialsId: cmPrivate.getEdpCredSsh(), url: myAppSharedCodeRepo
  }
  props = readYaml file: projectYamlFileLocation
  environments = readYaml file: environmentsYamlFileLocation
  stash includes: "pipeline-shared/**", name: sharedFilesStashName
}
