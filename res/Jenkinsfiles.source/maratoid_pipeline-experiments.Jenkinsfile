#!/usr/bin/env groovy
@Library('pipeline')
import net.zonarsystems.pipeline.PipelineHelpers
import net.zonarsystems.pipeline.PipelineBuilders
import groovy.transform.Field
import hudson.EnvVars
import org.jenkinsci.plugins.workflow.cps.EnvActionImpl
import hudson.model.Cause

podTemplate(label: "jenkins-gke-upstream", containers: [
  containerTemplate(name: 'gke', image: 'gcr.io/sds-readiness/jenkins-gke:latest', ttyEnabled: true, command: 'cat', alwaysPullImage: true),
],
volumes: []) {
  node ("jenkins-gke-upstream") {
    container('gke') { 
      checkout scm
      env.HELMPARAM_images_agentImage ='gcr.io/blah/agent:12345'
      env.HELMPARAM_images_masterImage = 'gcr.io/blah/master:12345'
      env.HELMPARAM_nodePorts_nginx = 32000
      env.HELMPARAM_nodePorts_jenkins = 32004
      env.HELMPARAM_services_backend_proxy = 'something something'
      env.HELMPARAM_services_other = 'darkside'
      env.HELMREQ_loadbalancer = '1.2.3'
      env.HELMREQ_jenkinsbase = '4.5.6'
      env.HELMREQ_someotherreq = '7.8.9'
    }
  }
}
