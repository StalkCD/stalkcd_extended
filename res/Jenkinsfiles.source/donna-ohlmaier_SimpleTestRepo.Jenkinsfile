// Jenkinsfile (Declarative Pipeline)
// pipeline {
//     agent any
//     stages {
//         stage('build') {
//             steps {
//                 bat 'echo fail'
//             }
//         }
//     }
// }

node {
	stage 'Checkout'
		checkout scm

	stage 'Build'
	//	bat 'nuget restore SolutionName.sln'
		bat "\"${tool 'MSBuild'}\" \"C:\\Program Files (x86)\\Jenkins\\workspace\\Test_Pipeline\\SimpleTestRepo\\SimpleTestSln\\SimpleTestSln.sln\" /p:Configuration=Release /p:Platform=\"Any CPU\" /p:ProductVersion=1.0.0.${env.BUILD_NUMBER}"

	stage 'Archive'
		archive 'ProjectName/bin/Release/**'

}