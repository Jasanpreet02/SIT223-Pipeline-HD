pipeline {
    agent any

    tools {
        git 'Git'
    }

    stages {
        stage('Build') {
            steps {
                bat 'docker build -t jasan-media-app .'
            }
        }
        stage('Test') {
            steps {
                // Running test INSIDE the container
                bat 'docker run --rm -e CI=true jasan-media-app npm test -- --watchAll=false --passWithNoTests'
            }
        }
        stage('Code Quality') {
            steps {
                // Running lint INSIDE the container
                bat 'docker run --rm jasan-media-app npm run lint || echo "Quality check done"'
            }
        }
//         stage('Security') {
//     steps {
//         script {
//             catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') {

//                 // Step 1: Check vulnerabilities
//                 bat 'docker run --rm jasan-media-app npm audit'

//                 // Step 2: Auto-fix safe vulnerabilities
//                 bat 'docker run --rm jasan-media-app npm audit fix || echo "Auto fix completed"'

//                 // Step 3: Rebuild image after fix
//                 bat 'docker build -t jasan-media-app .'

//                 // Step 4: Re-check (optional verification)
//                 bat 'docker run --rm jasan-media-app npm audit || echo "Post-fix audit completed"'
//             }
//         }
//     }
// }
       stage('Security') {
    steps {
        script {
            echo "Running security scan..."

            bat 'docker run --rm jasan-media-app npm audit || exit 0'

            echo "Applying safe fixes (non-blocking)..."
            bat 'docker run --rm jasan-media-app npm audit fix || exit 0'

            echo "Rebuilding image after dependency updates..."
            bat 'docker build -t jasan-media-app .'
        }
    }
}
        stage('Deploy') {
            steps {
                bat 'docker rm -f staging-app || exit 0'
                bat 'docker run -d -p 8081:3000 --name staging-app jasan-media-app'
            }
        }
        stage('Release') {
            steps {
                bat 'docker tag jasan-media-app jasan-media-app:v1.0'
            }
        }
           stage('Monitoring') {
    steps {
        script {
            bat 'curl -f http://localhost:8081 || exit 1'
        }
    }
}
    }
}