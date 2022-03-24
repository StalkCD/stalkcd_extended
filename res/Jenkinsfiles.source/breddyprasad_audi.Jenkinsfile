pipeline {
 agent any 

 try {

 stages{
   stage('one'){
     steps{
         echo "Hi,this is prasad from devops Engineer"

}

}
    stage('two'){
      steps{
         input("Do you want to proced")

}
}

      stage('Three'){
       when {
        not{
                  branch "master"
        }
       }
       

        steps{
           echo "hello"
   }
   }
  
   
 stage('four') {

         parallel{
               stage('unit Test'){
                           steps{
                               echo "Running the unit test........"

                        }

}

stage('Integration test'){
                agent{
                        docker{
                          reuseNode false
                           image 'ubuntu'
         }
}
steps{
     echo "Running the integration testing......."

}
}
}
}
}
 
 }catch (err){
        mail bcc: '', body: 'this is pipeline jobs', cc: '', from: '', replyTo: '', subject: 'welcome to jenkins pipeline jobs ', to: 'prasadaws92@gmail.com'
 
 }

}
