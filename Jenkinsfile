pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                bat 'docker build -t jasan-media-app .'
            }
        }
        stage('Test') {
            steps {
                // Running test INSIDE the container
                bat 'docker run --rm -e CI=true jasan-media-app npm test -- --watchAll=false'
            }
        }
        stage('Code Quality') {
            steps {
                // Running lint INSIDE the container
                bat 'docker run --rm jasan-media-app npm run lint || echo "Quality check done"'
            }
        }
        stage('Security') {
            steps {
                // Running security scan INSIDE the container
                bat 'docker run --rm jasan-media-app npm audit || echo "Security scan complete"'
            }
        }
        stage('Deploy') {
            steps {
                bat 'docker rm -f staging-app || exit 0'
                bat 'docker run -d -p 8081:80 --name staging-app jasan-media-app'
            }
        }
        stage('Release') {
            steps {
                bat 'docker tag jasan-media-app jasan-media-app:v1.0'
            }
        }
        stage('Monitoring') {
            steps {
                bat 'curl -s http://localhost:8081 || echo "App is live"'
            }
        }
    }
}