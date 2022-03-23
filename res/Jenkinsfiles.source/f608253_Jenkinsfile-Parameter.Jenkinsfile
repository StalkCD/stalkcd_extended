pipeline {
agent any
parameters {
string(name: 'user', defaultValue: 'John', description: 'A user that triggers the pipeline')
}
stages {
stage('Trigger pipeline') {
steps {
echo "Pipeline triggered by ${params.USER}"
}
}
}
}
