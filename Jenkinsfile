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

        stage('analisis con sonarqube') {
            steps {
                withSonarQubeEnv(credentialsId: 'sonarqube', installationName: 'sonarqube') {
                    sh '''
					$SCANNER_HOME/bin/sonar-scanner \
						-Dsonar.projectKey=anmeraApiStore \
						-Dsonar.projectName=anmeraApiStore \
                        -Dsonar.projectVersion=1.0 \
                        -Dsonar.sources=/var/jenkins_home/workspace/anmeraApiStore \
                        -Dsonar.sourceEncoding=UTF-8
					'''
                    echo 'SonarQube Analysis Completed'
                }
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