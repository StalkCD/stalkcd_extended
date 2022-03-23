//THIS IS A TEMPORAL Jenkinsfile for early stage of development is going to be deleted
//TODO: deployment has to be replaced using a microservices approach
pipeline {
    agent any
    parameters {
        //string(defaultValue: "develop", description: '', name: 'branch_name_provided') //auto fill with git branches
        choice(choices: ['until-test', 'until-deploy'],
            description: 'Select your target stage',
            name: 'pipeline_stage_target')       
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'npm install'                
                setBuildStatus("Building","PENDING","Jenkins CI","${GIT_COMMIT}")
                
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh 'ng lint'
                setBuildStatus("Testing","PENDING","Jenkins CI","${GIT_COMMIT}")
            }
            post {
                failure {
                    echo "Test are failing"
                    setBuildStatus("Test are failing","FAILURE","Jenkins CI","${GIT_COMMIT}")
                }    
            }
        }
        stage('Deploy:QA') {
            agent {
                label 'QA'
            } 
            when { 
                expression{ return params.pipeline_stage_target == "until-deploy"}
            }
            steps {
                echo 'Deploying....'
                //the agent defines the working directory 
                git([url: 'git://example.com/amazing-project.git', branch: ${GIT_BRANCH}])
                sh 'npm install'
                sh 'nohup ng serve 2>&1 >> /var/log/ng.log &'
                
            }
        }
    }
    post {
        success {
            echo "we did it"
            setBuildStatus("Complete","SUCCESS","Jenkins CI","${GIT_COMMIT}")
        }
        failure {
            setBuildStatus("Complete","FAILURE","Jenkins CI","${GIT_COMMIT}")
        }
    }

}

def setBuildStatus(String message, String state, String context, String sha) {
    step([
        $class: "GitHubCommitStatusSetter",
        reposSource: [$class: "ManuallyEnteredRepositorySource", url: "https://github.com/PALMDEV/drproject.git"],
        contextSource: [$class: "ManuallyEnteredCommitContextSource", context: context],
        errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
        commitShaSource: [$class: "ManuallyEnteredShaSource", sha: sha ],
        statusBackrefSource: [$class: "ManuallyEnteredBackrefSource", backref: "${BUILD_URL}flowGraphTable/"],
        statusResultSource: [$class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
    ]);
}