@Library('tikal-pipelib') _
import tpl.ci.node.tplNodeCiPipeline

pipeline {
    agent { label 'kubeslave' }
    parameters {
        string(defaultValue: '', description: '', name: 'kubeContext')
//        string(defaultValue: 'shelleg', description: 'docker repository prefix name which defaults to shelleg', name: 'dockerRegistryPrefix')
//        string(defaultValue: 'config',  description: 'microservice tag defaults to config', name: 'containerTag')
//        string(defaultValue: 'msa-api', description: 'microservice name', name: 'containerName')
//        string(defaultValue: 'msa-api', description: 'microservice Dockerfile\'s relative path', name: 'dockerPath')
    }
    stages {
        stage ("porthos") {
            steps {
                script {
                    pipeline = new tplNodeCiPipeline(this)
                    pipeline.run()
               }
            }
        }
    }
}
