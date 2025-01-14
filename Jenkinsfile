pipeline {
    agent none
    stages {
        stage('Build and Deploy') {
            agent { label 'develop-agent' }
            when {
                branch 'develop'
            }
            steps {
                script {
                    withCredentials([file(credentialsId: 'frontend-dev', variable: 'env_file')]) {
                        // Create workspace and pull code
                        sh "cat ${env_file} > .env"
                        // Start services
                        sh "docker compose -f docker-compose.dev.yml up -d --build"
                    }
                }
            }
        }

        stage('Build and Deploy master') {
            agent { label 'master-agent' }
            when {
                branch 'master'
            }
            options {
                skipDefaultCheckout()
            }
            steps {
                script {
                    withCredentials([file(credentialsId: 'frontend-prod', variable: 'env_file')]) {
                        dir('/ipca/ipca-system') {
                            // Create workspace and pull code
                            sh "cat ${env_file} > .env"
                            // Start services
                            sh "docker compose -f docker-compose.yml up -d --build ipca-frontend --no-deps"
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