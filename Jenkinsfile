pipeline {
    agent any

    environment {
        SCANNER_HOME = tool 'sonarqube'
    }

    stages {

        stage('detener contanedores anteriores desplegado') {
            steps {
                script {
                    echo "deteniendo los contendores"
                    sh 'docker compose down -v'
                }
            }
        }

        stage('limpiando docker de imagenes volumenes del la instalacion anterio') {
            steps {
                sh 'docker system prune -a --volumes -f'
            }
        }

        stage('compilando el contendor') {
            steps {
                sh 'docker compose build --no-cache'
            }
        }

        stage('desplegando el contendor') {
            steps {
                sh 'docker compose up -d --force-recreate'
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully! The application has been deployed."
        }
        failure {
            echo "Pipeline failed! The application has not been deployed."
        }
    }
}