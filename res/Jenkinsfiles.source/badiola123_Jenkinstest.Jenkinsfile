pipeline {
    agent any

    stages {
        stage ('Build') {
            steps {
                echo 'This is a minimal pipeline.'
              sh 'mvn clean'
              sh 'mvn site'
              sh 'mvn sonar:sonar \
  -Dsonar.host.url=http://ec2-34-195-236-81.compute-1.amazonaws.com:9000 \
  -Dsonar.login=b159cf49da251b0f93b797dfebbd619d168077ae'
              sh 'mvn jacoco:prepare-agent install jacoco:report'
            }
        }
    }
}
