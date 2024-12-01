pipeline {
    agent none
    stages {
        stage('Setup Environment') {
            options {
                skipDefaultCheckout()
            }
            steps {
                script {
                    sh 'printenv'
                    if (env.BRANCH_NAME == 'master') {
                        agent_label = 'master-agent'
                        docker_compose_file = 'docker-compose.prod.yml'
                    } else if (env.BRANCH_NAME == 'develop') {
                        agent_label = 'built-in' // Use built-in node
                        docker_compose_file = 'docker-compose.dev.yml'
                    } else {
                        error "Branch ${env.BRANCH_NAME} is not configured!"
                    }
                }
            }
        }
        
        stage('Build and Deploy') {
            agent { label agent_label }
            steps {
                withCredentials([file(credentialsId: 'frontend-dev', variable: 'env_file')]) {
                    sh "git branch"
                    // Set environment variables
                    sh "cat ${env_file} > .env"

                    sh "cat .env"
                    sh "echo agent_label: ${agent_label}, docker_compose_file: ${docker_compose_file}"
                    // Start services
                    sh "docker compose -f ${docker_compose_file} up -d --build"
                }
            }
        }

        stage('Cleanup') {
            agent { label agent_label }
            options {
                skipDefaultCheckout()
            }
            steps {
                sh "docker system prune -a -f"
            }
        }
    }

    post {
        always {
            echo "Pipeline finished for branch: ${env.BRANCH_NAME}"
        }
    }
}