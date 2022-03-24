pipeline{
    agent any
    environment{
        NAME="Harshith"
    }
    stages{
        stage("Greetings"){
            input {
                message '"New Pipeline"'
                ok 'ok'
                submitterParameter 'Pipy'
                parameters {
                    booleanParam defaultValue: true, description: 'is it a pipeline', name: 'pipes'
                }
            }

            steps{
                echo "Hello World ${NAME}"
                echo "${pipes}"
            }
        }
        stage("Trigger the rest"){
            steps{
                build "Test"
            }
        }
    }
}
