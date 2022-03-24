pipeline{

 agent any
 environment{
 
 }
 parameters{
 
 
 }
 
 options{
  
     discardOldBuilds: true
  
 
 }
 
 stages{
 
     agent{
       docker{
       }
       Dockerfile{
       }
       node{
         label:
         customPath:
       }
     }
     
     stage("building stage "){
 
        when{
          branch : master
          anyOf
          allOf
        }
        
        steps{
          script{
          }
        }
        
     }

 
 }
 
 post{
 
   always{
   
   }
   
   sucess{
   
   }
   
   failure{
   
   }
   
 }


}

// Snippet Generator helps with generating steps
// Declarative Directive Generator 

//  Blocks must only consist of 
   // Pipeline contains Sections

     //  Sections: agent,  stages,  {steps} , post

        //  Directives: options, parameters, environment, triggers, when, input, stage, tools

//  Steps: script


// below are various sections, sections contain directives or steps  

pipeline{

 agent{}
 //perameters{} only in the pipeline block the values are made available in the pipeline steps as key-value pairs
 //options{}  
 // environment{} 
 // triggers{}
 stages{ // only once inside the pipeline
  stage('build'){agent{}  input{} when{} steps{ script{}} post{}}
  stage('test') {agent{} input{}  when{} steps{} post{}'// environment{} //options{}'} 
  stage('deploye'){agent{} input{} when{} parallel{ stage(){} stage{} stage{} } }
  
 }
 post{}


}




