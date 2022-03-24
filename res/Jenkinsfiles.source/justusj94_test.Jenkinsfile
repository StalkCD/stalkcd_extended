pipeline {
  agent {
    dockerfile true
  }
  stages {
    stage('Build') {
      agent any
      steps {
        sh 'ls -lh'
      }
    }
    stage('PHPUnit') {
      steps {
        sh '#phpunit --bootstrap Email.php tests/EmailTest'
      }
    }
    stage('Karma Unit Test') {
      steps {
        sh '''#rm -r -f ~/test/*
#mkdir -p ~/test/*
#cp tests/* ~/test/*

#~/node_modules/karma/bin/karma start ~/karma.conf.js
'''
      }
    }
    stage('Deploy') {
      steps {
        sh '''#git remote set-url origin git@github.com:justusj94/test.git
#git remote add upstream git@github.com:justusj94/test.git

#move to master branch and pull from test
#git checkout master
#git remote set-url origin git@github.com:justusj94/test.git
#git pull origin test

#merge test with master branch
#git merge --no-ff test 
#git push -u master

#cd /var/lib/jenkins
#remove and create deploy folder
#rm -r -f ~/deploy
#mkdir -p ~/deploy

#clone repository and deploy to remote server
#git clone https://github.com/justusj94/test.git ~/deploy
#ssh -i ~/.ssh/ssh-boomerweb root@stage.boomerweb.nl \'rm -r -f /var/www/stage.boomerweb.nl/justus/pipeline-test/*\'
#scp -r -i ~/.ssh/ssh-boomerweb ~/deploy/* root@stage.boomerweb.nl:/var/www/stage.boomerweb.nl/justus/pipeline-test
'''
      }
    }
  }
}
