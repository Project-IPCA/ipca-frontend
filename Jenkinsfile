pipeline {
    agent none
    environment {
        CREDENTIALS_ID = "${env.BRANCH_NAME == 'develop' ? 'frontend-dev' : 'prod'}"
        COMPOSE_FILE = "${env.BRANCH_NAME == 'develop' ? 'docker-compose.dev.yml' : 'docker-compose.yml'}"
        BUILD_OPTIONS = "${env.BRANCH_NAME == 'develop' ? '' : 'ipca-frontend --no-deps'}"
        WORKSPACE_DIR = "${env.BRANCH_NAME == 'develop' ? '' : '/ipca/ipca-system'}"
        AGENT_NODE = "${env.BRANCH_NAME == 'develop' ? 'develop-agent' : 'master-agent'}"
    }
    stages {
        options{
            script{
                if (env.BRANCH_NAME == 'master') {
                    skipDefaultCheckout()
                }
            }
        }
        stage('Build and Deploy') {
            agent { 
                label "${AGENT_NODE}"
            }
            steps {
                script {
                    withCredentials([file(credentialsId: "${CREDENTIALS_ID}", variable: 'env_file')]) {
                        if (${WORKSPACE_DIR}) {
                            dir("${WORKSPACE_DIR}") {
                                sh "cat ${env_file} > .env"
                                sh "docker compose -f ${COMPOSE_FILE} up -d --build ${BUILD_OPTIONS}"
                            }
                        } else {
                            sh "cat ${env_file} > .env"
                            sh "docker compose -f ${COMPOSE_FILE} up -d --build"
                        }
                    }
                }
            }
        }
    }
    post {
        always {
            echo "Pipeline finished for branch: ${env.BRANCH_NAME}"
        }
    }
}