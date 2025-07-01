pipeline {
    agent none //{ label 'dev' }

    stages {
        stage('code') {
            steps {
                checkout scm
            }
        }
        stage('build') {
            steps {
                echo 'Build...'
                sh 'docker build --no-cache -t devopstut .'
            }
        }
        stage('deploy') {
            steps {
                echo 'Deploy...'
                sh 'docker-compose down'
                sh 'docker-compose up -d'
            }
        }
    }
}
