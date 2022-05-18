#!/usr/bin/env groovy

node {
    stage('checkout') {
        checkout scm
    }

    stage('check java') {
        sh "java -version"
    }

    stage('clean install') {
        sh "chmod +x mvnw"
        sh "./mvn clean install"
    }
    /*
    stage('nohttp') {
        sh "./mvnw -ntp checkstyle:check"
    }

    stage('install tools') {
        sh "./mvnw -ntp com.github.eirslett:frontend-maven-plugin:install-node-and-npm@install-node-and-npm"
    }

    stage('npm install') {
        sh "./mvnw -ntp com.github.eirslett:frontend-maven-plugin:npm"
    }
    */
    //stage('packaging') {
    //    sh "./mvnw -ntp verify -P-webapp -Pprod -DskipTests"
    //    archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true
    //}
    
    stage('quality analysis') {
        //sh "./mvnw initialize sonar:sonar -Dsonar.host.url=http://localhost:9001"
        sh "./mvn sonar:sonar -Dsonar.host.url=http://localhost:9001"
        /*withSonarQubeEnv('sonar') {
            //sh "./mvnw -ntp initialize sonar:sonar -Dsonar.host.url=http://localhost:9001"

            //mvnw initialize sonar:sonar -Dsonar.host.url=http://localhost:9001
        }*/
    }
    /*
    def dockerImage
    stage('publish docker') {
        // A pre-requisite to this step is to setup authentication to the docker registry
        // https://github.com/GoogleContainerTools/jib/tree/master/jib-maven-plugin#authentication-methods
        sh "./mvnw -ntp -Pprod verify jib:build"
    }
    */
}
