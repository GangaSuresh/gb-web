pipeline {
    agent any

    environment {
        AWS_CREDENTIALS = credentials('aws-creds')  
        GITHUB_CREDENTIALS = credentials('github-creds')  
        S3_BUCKET = "${env.BRANCH_NAME == 'main' ? 'fe-admin-web-prod' : 'fe-admin-web'}"
        NODE_ENV = "${env.BRANCH_NAME == 'main' ? 'production' : 'development'}"
        NODE_VERSION = "23.7.0" 
    }

    stages {
        stage('Checkout Code') {
            steps {
               checkout([$class: 'GitSCM',
                    branches: [[name: "*/$env.BRANCH_NAME"]],
                    userRemoteConfigs: [[url: 'https://github.com/projectpathhere.git', credentialsId: 'github-creds']]
                ])
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                script {
                    // Log Node.js version and PATH
                    sh 'echo "Node.js version: $(node -v)"'
                    sh 'echo "NPM version: $(npm -v)"'
                    sh 'echo "PATH: $PATH"'
                    
                    def envFile = NODE_ENV == 'production' ? '.env.production' : '.env.development'
                    sh "cp ${envFile} .env"
                }
                sh "NODE_OPTIONS=--max_old_space_size=1024 npx tsc && npx vite build --mode ${NODE_ENV}"
            }
        }

        stage('Package and Deploy to S3') {
            steps {
                withAWS(credentials: 'aws-creds', region: 'ap-south-1') {
                    sh "aws s3 sync ./dist s3://$S3_BUCKET --delete"
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
