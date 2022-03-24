// Jenkinsfile (Declarative Pipeline)
pipeline {
    agent none


    stages {
        stage('Non-Parallel Build') {
            steps {
                echo 'Non-Parallel Building'

            }
        }



//        stage('Parallel stage Build') {
//            //对耗时长，相互不存在依赖的stage可以使用并行parallel嵌套stage方式提升运行效率
//            //一个stage必须只有一个steps或parallel的步骤 , 下面使用parallel 块，那么当前stage就不可以再偶steps块，自然也就没有 agent ,tool 块了
//
//
//            failFast true  // 当其中一个进程失败时，您可以强制所有的parallel阶段都被终止
//
//            parallel { // 嵌套stage本身不能包含进一步的parallel并行stage
//
//                stage('Parallel Build A') {
//                    agent {
//                        label 'production'
//                    }
//                    steps {
//                        echo 'Parallel Build A Building'
//                        sh 'pwd'
//                        sh 'cat /etc/hostname'
////                        sh 'mvn package'
//
//
//                    }
//                }
//
//                stage('Parallel Build B') {
//                    agent {
//                        label 'testing'
//                    }
//                    steps {
//                        echo 'Parallel Build B Building'
//                        sh 'pwd'
//                        // pom.xml 文件要 maven-surefire-plugin 设置为false，即要maven test运行我们的Junit测试， 会在项目 target/surefire-reports 目录下生成一个txt,一个xml测试结果报告文件
////                        sh 'mvn package'
//                        sh 'cat /etc/hostname'
//
//
//
//                        script{
//                            // grovvy script 定义的变量与jenkins pipeline environment 块中定义的环境变量是不同概念应该。
//                            // grovvy script 定义的变量字符串插值的引用方式与 jenkins pipeline environment 块中定义的环境变量字符串插值引用也不同。
//                            // grovvy script 定义的变量字符串插值的引用方式： $VARIABLE_NAME 或 ${VARIABLE_NAME}
//                            // jenkins pipeline environment 块中定义的环境变量字符串插值引用方式：  ${env.VARIABLE_NAME}
//
//
//
//                            def name = "tom"
//                            echo "$name ${name}"
//
//
//                        }
//
//
//                    }
//
//                    post {//下面是构建后执行的相应操作，顺序执行，可能会满足多个条件执行多个块
//                        //下面always ， success 等块中执行的内容与steps块中相同
//                        always {
//
//                            //always 块类似于 try/finally script
//
//
//                            //  模式匹配指向上面mvn package Junit测试结果报告文件。jenkins会生成一个可追踪历史的可视化测试报告文件
//                            junit keepLongStdio: true, testResults: '**/target/surefire-reports/*.xml'
//                            echo "currentBuild result: ${currentBuild.result}"
//                            emailext body: '$DEFAULT_CONTENT', subject: '$DEFAULT_SUBJECT', to: '$DEFAULT_RECIPIENTS'
//                        }
//                        success {
//                            echo 'Parallel Build B succeeeded!'
//                        }
//                        unstable {
//                            echo 'Parallel Build B is unstable :/'
//                        }
//                        failure {
//                            echo 'Parallel Build B failed :('
//                        }
//                        changed {
//                            echo 'Parallel Build B: Things were different before...'
//                        }
//                    }
//
//
//                }
//            }
//        }


    }
    post {//下面是构建后执行的相应操作，顺序执行，可能会满足多个条件执行多个块
        //下面always ， success 等块中执行的内容与steps块中相同
        always {

            //always 块类似于 try/finally script


            echo 'One way or another, I have finished'
            //cleanWs notFailBuild: true    // 构建后，清空构建目录
            //下面是使用 jenkins 自带的email插件发送邮件，在使用前需要在jenkins 系统管理->系统设置 中进行email的配置，如配置好邮件SMTP server 服务器地址等
            //mail bcc: '', body: 'jenkins build success $$$$', cc: '', from: 'LimsAdmin@wuxiapptec.com', replyTo: '', subject: 'jenkins build success', to: 'dong_zhengdong@wuxiapptec.com'
            //下面是使用自己另外在jenkins中安装的email ext插件进行email功能使用，同样需要在jenkins 系统管理->系统设置 中进行email的配置，如配置好邮件SMTP server 服务器地址等，当然，该插件还有进行其他配置，如：Default Recipients，Default Subject ， Default Content ，Additional accounts 等，这些在jenkins配置的全局配置在Jenkinsfile中可以以变量的进行引用，如下：
            emailext body: '$DEFAULT_CONTENT', subject: '$DEFAULT_SUBJECT', to: '$DEFAULT_RECIPIENTS'
        }
        success {
            echo 'I succeeeded!'
        }
        unstable {
            echo 'I am unstable :/'
        }
        failure {
            echo 'I failed :('
        }
        changed {
            echo 'Things were different before...'
        }
    }


}
