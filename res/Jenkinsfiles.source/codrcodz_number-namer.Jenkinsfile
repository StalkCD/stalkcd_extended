// Pipeline for namer.sh bash program
pipeline {

    // No agent needed. Running directly on Jenkins master node.
    agent any
    
    stages {
        // No build needed. Executing from source code.
        stage('Build') {
            steps {
                echo "No build required. Executing from source...."
            }
        }
        stage('Test') {
            steps {
                // Make program executable by jenkins user.
                echo "Preparing test environment..."
                sh "chmod u+x ./namer.bash"
                
                // Test program's ability to parse CLI options and return expected results.
                echo "Testing.."
                // bashtest is pre-installed on Jenkins master node.
                sh "bashtest ./test/digit-test.bashtest"
                sh "bashtest ./test/alpha-test.bashtest"
            }
        }
        stage('Deploy') {
            steps {
                echo "No deploy step needed yet; proceeding to \"post\" step..."
            }
        }
    }

    post {
        success {
            echo "Great success."
        }
        failure {
            echo "Oh noes. :-("
        }
    }
}
