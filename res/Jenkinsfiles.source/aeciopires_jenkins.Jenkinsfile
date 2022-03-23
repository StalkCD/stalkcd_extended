pipeline {
/* Foi iniciado um comentário com múltiplas linhas.
  Este texto será ignorado durante a execução do pipeline.
*/

  // A secao 'agent' define o nome do node cadastrado no Jenkins que podera
  // executar o pipeline
  // 'any' Qualquer node, inclusive o Jenkins master podera executar o pipeline
  agent any

  // A secao 'environment' contem a declaracao de variaveis usadas no pipeline
  environment {

    // As variaveis de ambiente, preferencialmente devem estar em caixa alta
    // para facilitar a diferenciação das palavras reservadas do pipeline.
    // 'null', significa que variavel será iniciada com o valor nulo (vazio)
    VERSAO_REGISTRY = null

    // Aspas simples servem para unificar o texto.
    WORKSPACE_DIR      = pwd()
    URL_SONARQUBE      = 'http://ci-server.domain.com.br:9000'
    PROJECT            = 'app_livro'
    DEPLOY_TEST_ENV    = 'test'
    DIR_HOSTFILE       = '/home/jenkins/'
    DIR_TMP            = '/tmp'
  }

  stages {
    stage('Checkout Projects'){
      steps{

        // Usando o 'echo' para exibir uma mensagem
        echo 'Checkout do projeto do Git...'

        // Usando o 'sh' para acessar o shell bash do node para executar comandos
        sh "mkdir -p $WORKSPACE_DIR/app/;"

        // Acessando o diretorio de trabalho e executando comandos dentro desse
        // diretorio
        dir("${WORKSPACE_DIR}/app/"){

          //Checkout do projeto
          git branch: 'master',
            url: 'https://github.com/jhipster/jhipster-registry'
        }
      }
    }
    stage('Results') {
      steps {
        echo 'Fim do Pipeline... Foi implantado no ambiente de teste'
        echo "PROJECT         => $PROJECT"
        echo "DEPLOY_TEST_ENV => $DEPLOY_TEST_ENV"
        echo "DIR_HOSTFILE    => $DIR_HOSTFILE"
      }
    }
  }
}
