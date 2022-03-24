pipeline {
  agent none
  parameters {
    choice(name: 'sequencia',
      choices: 'A - Executor\nZ - Tudo',
      description: 'Opção de execução:')
    string(name: 'versao',
      description: 'Número da versão:')
  }
  stages {
    stage('Inicio') {
      steps {
        milestone 1
      }
    }
    stage('Compilar') {
      agent {
        node {
          label 'Windows'
        }
      }
      steps {
        bat 'build Compilar'
      }
      when {
        beforeAgent true
        expression { BRANCH_NAME ==~ /(master|v_.*)/ }
      }
    }
    stage('Testes') {
      agent none
      steps {
        //bat 'build Testes'
        //nunit(testResultsPattern: 'TestResult.xml', failIfNoResults: true)
        print "Testes ignorados"
        input message: 'Proceder com a liberação em produtos?'
      }
    }
  }
  post {
    always {
      print 'This will always run'
    }
    success {
      print 'This will run only if successful'
    }
    failure {
      print 'This will run only if failed'
    }
    unstable {
      print 'This will run only if the run was marked as unstable'
    }
    changed {
      print 'This will run only if the state of the Pipeline has changed'
      print 'For example, the Pipeline was previously failing but is now successful'
    }
  }
}