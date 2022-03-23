pipeline {
    agent any
    stages {
        stage('Checkout') {
steps{
            //checkout files
            checkout([
                $class: 'GitSCM', 
                branches: [[name: '*/master']], 
                doGenerateSubmoduleConfigurations: false, 
                extensions: [], 
                submoduleCfg: [], 
                userRemoteConfigs: [[
                    credentialsId: '92f63fc5-ea70-4e81-b790-3c100613e3a1', 
                    url: 'git@github.com:perkshivang/shivang-ios-jenkins.git'
                    ]]
                    ])
            // dir('build') {
            //     deleteDir()
            // }

            // sh "mkdir -p build"

}
        }
        stage('Build'){
            steps{


            sh 'xcodebuild -workspace "JenkinsSample.xcworkspace" -scheme "JenkinsSample" -configuration "Release" build'

             sh "xcrun xcodebuild -workspace 'JenkinsSample.xcworkspace' -scheme 'JenkinsSample' archive -archivePath 'Build/JenkinsSample'"
            //     sh "xcrun xcodebuild -exportArchive -exportOptionsPlist exportOptions.plist -archivePath 'build/JenkinsSample' -exportPath build"
            //     dir('build') {
            //          sh "zip -qr 'JenkinsSample.zip' 'JenkinsSample'"
            //         // sh "mv 'Jenkins iOS Example.ipa' 'Jenkins iOS Example-${branchNameForURL}.ipa'"
            //     }

            sh 'xcodebuild -exportArchive -archivePath /Users/shivang/.jenkins/workspace/MyPipeline/Build/JenkinsSample.xcarchive \
-exportPath /Users/shivang/.jenkins/workspace/MyPipeline/Build/ \
-exportOptionsPlist /Users/shivang/.jenkins/workspace/MyPipeline/ExportOptions.plist'                
                
            sh    '/Users/shivang/.jenkins/workspace/MyPipeline/Pods/Crashlytics/submit 7046a2db871ccf3d313cdfb7a582229887fde528 f7a06edfc22f80b16c13ed947758ae06a8d0cc7c0d6000f360dbc352bcd9e327 \
-ipaPath /Users/shivang/.jenkins/workspace/MyPipeline/build/JenkinsSample.ipa -emails shivang@perk.com,shivangvyas2008@gmail.com \
-groupAliases ios-developers -notesPath /Users/shivang/.jenkins/workspace/MyPipeline/Notes/ReleaseNotes.txt \
-notifications YES'
            }
        }
    }
}
