pipeline{
    agent{
        node{
            label 'master'
        }
    }

    /*
    https://jenkins.io/doc/book/pipeline/syntax/#tools
    */
    tools{
        git 'Default'
    }
    

    /*
    https://jenkins.io/doc/book/pipeline/syntax/#parameters
    */
    parameters{
        string(
            name: 'deploy_env',
            defaultValue: 'int',
            description: 'this will make build parameterised'
        )
    }

    /*
    https://jenkins.io/doc/book/pipeline/syntax/#options
    https://jenkins.io/doc/book/pipeline/syntax/#stage-options
    */
    options{
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    /*
    https://jenkins.io/doc/book/pipeline/syntax/#environment
    */
    environment{
        CHECKOUTPATH = 'mycustompath/path'
        /*ROOT = tool name: 'Go 1.8', type: 'go'*/ 
    }

    /*
    https://jenkins.io/doc/book/pipeline/syntax/#triggers
    */
    triggers{
        cron('H */4 * * 1-5')
    }

    /*
    https://jenkins.io/doc/book/pipeline/syntax/#stages
    */
    stages{
        stage('pre'){
            steps{       

                /*
                https://jenkins.io/doc/pipeline/steps/ws-cleanup/#cleanws-delete-workspace-when-build-is-done
                */         
                cleanWs()                
                
                /*
                https://jenkins.io/doc/pipeline/steps/workflow-basic-steps/#dir-change-current-directory
                */
                dir(CHECKOUTPATH){
                    /*
                    https://jenkins.io/doc/pipeline/steps/git/#git-git
                    */
                    git(                    
                        url: 'https://github.com/dhavlev/simple-java-maven-app.git',
                        branch: 'master'
                    )

                    /*https://jenkins.io/doc/pipeline/steps/workflow-basic-steps/#withenv-set-environment-variables*/
                    /*https://stackoverflow.com/a/46608311/5975329*/
                    /*withEnv(["GOROOT=${root}", "PATH+GO=${root}/bin"]){
                        sh(
                            script: "go version"
                        )
                    }*/
                }

                script{
                    /*
                    https://jenkins.io/doc/pipeline/steps/workflow-basic-steps/#isunix-checks-if-running-on-a-unix-like-node
                    */
                    if (isUnix()){
                        sh(
                            script: 'echo This is Pre Step'
                        )
                    } else{
                        bat(
                            script: 'echo This is Pre Step'
                        )
                    }
                }              
            }
        }

        stage('Build'){
            steps{
                script{
                    if (isUnix()){
                        sh(
                            script: 'echo This is Build Step'
                        )
                    } else{
                        bat(
                            script: 'echo This is Build Step'
                        )
                    }
                }      

            }            
        }
    }

    /*
    https://jenkins.io/doc/book/pipeline/syntax/#post
    */
    post{
        always{
            echo 'I will always say Hello again!'            
        }
    }
}