pipeline {
    agent any
    parameters {
        choice(
            name: 'PLATFORM',
            choices:"Test\nArt19-Data-Pipeline\nBrightcove-Report\nBrightcove-Video\nData-Delivery\nGlobal_Facebook_Engagement_Score\nGoogle-Analytics-Data-Pipeline\nInstagram-Data-Pipeline\nTwitter-Analytics\nTwitter-Data-Pipeline\nYoutube-Data",
            description: "Choose the lambda function to deploy or rollback")
        choice(
            name: 'STAGE',
            choices:"dev\nstag",
            description: "Choose the lambda function to deploy or rollback")    
    }
    stages {
        stage('Build') {
            steps {
                // echo "Building..the project in environment ${STAGE}"
                echo " Parameters are ${PLATFORM}"
                echo " STAGE IS ${STAGE}"
                
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}