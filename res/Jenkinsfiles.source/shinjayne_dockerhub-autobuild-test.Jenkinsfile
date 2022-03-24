/*
written by Jayne Shin 
< Declarative Pipeline Syntax Structure >
1. Top level block : pipeline 
2. Section
- agent
- stages
- steps 
- post
3. Directive
- environment 
- options
- parameters
- trigger 
- stage

*/

pipeline {
  agent any
  triggers {
    // Generic Webhook Trigger : https://wiki.jenkins.io/display/JENKINS/Generic+Webhook+Trigger+Plugindd
    // starts when receive POST -> JENKINS_URL/generic-webhook-trigger/invoke
    GenericTrigger(
     genericVariables: [
      [key: 'ref', value: '$.ref']
     ],
     causeString: 'Triggered on $ref',
     regexpFilterExpression: '',
     regexpFilterText: '',
     printContributedVariables: true,
     printPostContent: true
    )
  }
  stages {
    stage('Wait') {
      
    }
  }
}
