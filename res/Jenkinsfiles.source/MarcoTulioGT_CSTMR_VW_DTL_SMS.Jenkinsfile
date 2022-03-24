pipeline {
    agent any
     environment {
    def branch = 'master'
    def pipelineName = 'HolaMundoMaco4'
}
    stages {
        stage('Genera Pipeline Dev') {
            steps {
                    script {	
                echo 'Obteniendo codigo fuente desde Api Streamsets ' 
                sh 'curl -u admin:admin http://172.22.171.20:18630/rest/v1/pipeline/PipelineHolaMundocb639a10-2bf8-4eab-be09-7b566909f516/export?rev=1.1 > '+pipelineName+'.json'
                }
            }
        }
        stage('Despliegue QA') {
            steps {
                    script {	
                echo 'cargando codigo fuente desde Api Streamsets ' 
                sh 'curl -X POST --header "Content-Type:application/json" --header "X-Requested-By:SDC" --data @'+pipelineName+'.json -u "stprd_adminssit:St@18!ssit" http://172.22.37.20:18630/rest/v1/pipeline/'+pipelineName+'/import?rev=0&overwrite=true&autoGeneratePipelineId=false&includeLibraryDefinitions=true'
                }
            }
        }
                stage('Test pipeline QA') {
            steps {
                    script {	
                echo 'cargando codigo fuente desde Api Streamsets ' 
              if (branch=='master') {
              env.TAG_ON_DEPLOY_PROD = input message: 'Requiere Aprobación',
              parameters: [choice(name: 'Deploy Production', choices: 'no\nyes', description: 'Selecciona "yes" Si esta de acuerdo en publicar en ambiente de Producción ')]
			}
              
                }
            }
        }
                stage('Despliegue Producción') {
                 when {
                 environment name: 'TAG_ON_DEPLOY_PROD', value: 'yes'
                    }
            steps {
                    script {	
                echo 'cargando codigo fuente desde Api Streamsets ' 
                //sh 'curl -X POST --header "Content-Type:application/json" --header "X-Requested-By:SDC" --data @PipelineHolaMundocb639a10-2bf8-4eab-be09-7b566909f516.json -u "stprd_adminssit:St@18!ssit" http://172.22.37.20:18630/rest/v1/pipeline/HolaMundo5/import?rev=0&overwrite=true&autoGeneratePipelineId=false&includeLibraryDefinitions=true'
           	
               }
            }
        }
    }
}
