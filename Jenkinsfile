pipeline {
    agent any

    environment {
        SCANNER_HOME = tool 'sonarqube'
        DB_HOST = credentials('DB_HOST_ANMERASTORE')
        DB_USER = credentials('DB_USER_ANMERASTORE')
        DB_PASSWORD = credentials('DB_PASSWORD_ANMERASTORE')
        DB_NAME = credentials('DB_NAME_ANMERASTORE')
        DB_PORT = credentials('DB_PORT_ANMERASTORE')
        DB_NAME_BASEADMIN = credentials('DB_NAME_BASEADMIN_ANMERASTORE')
        JWT_SECRET = credentials('JWT_SECRET_ANMERASTORE')
    }

    stages {

        stage('Crear las variables de entorno en un archivo .env') {
            steps {
                script {
                    writeFile file: '.env', text: """
                    DB_HOST=${DB_HOST}
                    DB_USER=${DB_USER}
                    DB_PASSWORD=${DB_PASSWORD}
                    DB_NAME=${DB_NAME}
                    DB_PORT=${DB_PORT}

                    DB_NAME_BASEADMIN=${DB_NAME_BASEADMIN}


                    JWT_SECRET=${JWT_SECRET}
                    """.trim()
                }
            }
        }

        stage('detener contanedores anteriores desplegado') {
            steps {
                script {
                    echo "deteniendo los contendores"
                    sh 'docker compose down -v --remove-orphans'
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