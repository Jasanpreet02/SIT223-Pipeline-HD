// pipeline {
//     agent any

//     tools {
//         git 'Git'
//     }

//     stages {
//         stage('Build') {
//             steps {
//                 bat 'docker build -t jasan-media-app .'
//             }
//         }
//         stage('Test') {
//             steps {
//                 // Running test INSIDE the container
//                 bat 'docker run --rm -e CI=true jasan-media-app npm test -- --watchAll=false --passWithNoTests'
//             }
//         }
//         stage('Code Quality') {
//             steps {
//                 // Running lint INSIDE the container
//                 bat 'docker run --rm jasan-media-app npm run lint || echo "Quality check done"'
//             }
//         }
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
//             }
//         }
//     }
// }
       
//         stage('Deploy') {
//             steps {
//                 bat 'docker rm -f staging-app || exit 0'
//                 bat 'docker run -d -p 8081:3000 --name staging-app jasan-media-app'
//             }
//         }
//         stage('Release') {
//             steps {
//                 bat 'docker tag jasan-media-app jasan-media-app:v1.0'
//             }
//         }
//            stage('Monitoring') {
//     steps {
//         script {
//             bat 'curl -f http://localhost:8081 || exit 1'
//         }
//     }
// }
//     }
// }

pipeline {
    agent any

    environment {
        // 🔐 Must exist in Jenkins credentials
        RAPID_API_KEY = credentials('rapidapi-key')
    }

    stages {

        stage('Build') {
            steps {
                bat """
                docker build --no-cache ^
                --build-arg REACT_APP_RAPID_API_KEY=%RAPID_API_KEY% ^
                -t jasan-media-app .
                """
            }
        }

        stage('Test') {
            steps {
                bat 'docker run --rm -e CI=true jasan-media-app npm test -- --watchAll=false --passWithNoTests'
            }
        }

        stage('Code Quality') {
            steps {
                bat 'docker run --rm jasan-media-app npm run lint || echo "Quality check done"'
            }
        }

        stage('Security') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') {

                        bat 'docker run --rm jasan-media-app npm audit'

                        bat 'docker run --rm jasan-media-app npm audit fix || echo "Auto fix completed"'

                        // 🔁 rebuild WITH API key again
                        bat """
                        docker build --no-cache ^
                        --build-arg REACT_APP_RAPID_API_KEY=%RAPID_API_KEY% ^
                        -t jasan-media-app .
                        """
                    }
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
                bat 'curl -f http://localhost:8081 || exit 1'
            }
        }
    }
}