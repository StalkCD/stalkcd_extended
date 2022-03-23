pipeline {
    // Needed because the agent section is mandatory here, even if it doesn't make sense
    agent none
    stages {
        stage('Compile') {
            parallel {
                stage('Stand-alone binary') {
                    agent { docker { image 'gcc:8.2' } }
                    steps {
                        sh 'make'
                        archiveArtifacts 'main'
                    }
                }
                stage('DEB Package') {
                    agent {
                        docker {
                            image 'ubuntu:cosmic'
                            // Needed for apt-get update (we get the error "List directory /var/lib/apt/lists/partial is missing. - Acquire (13: Permission denied)")
                            args '--user=root'
                        }
                    }
                    steps {
                        sh 'apt-get update && apt-get install --assume-yes gcc make'
                        sh 'make jent.deb'
                        archiveArtifacts '*.deb'
                    }
                }
                stage('RPM Package') {
                    agent {
                        docker {
                            image 'centos:7'
                            // Needed for yum (or we get the error "Permission denied: '/var/lib/rpm/.dbenv.lock'")
                            args '--user=root'
                        }
                    }
                    steps {
                        sh 'yum install --assumeyes gcc make rpm-build'
                        sh 'mkdir -p /root/rpmbuild/BUILD packa/root/rpmbuildge/BUILDROOT /root/rpmbuild/RPMS /root/rpmbuild/SOURCES /root/rpmbuild/SPECS /root/rpmbuild/SRPMS'
                        sh 'make jent.tar.gz'
                        sh 'cp jent.tar.gz /root/rpmbuild/SOURCES/jent-0.1.tar.gz'
                        sh 'rpmbuild -bb jent.spec'
                        // archiveArtifacts can only save files that are in the workspace so we have to move them there
                        sh 'mv /root/rpmbuild/RPMS/*/*.rpm .'
                        archiveArtifacts '*.rpm'
                    }
                }
            }
        }
    }
}

/*

- Multiple pipelines in the same Jenkinsfile doesn't seem to work. It aborts with
  an DSL error on the second pipeline section.

*/
