pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '15'))
    }

    stages {
        stage('Checkout and Inspect') {
            steps {
                checkout scm
                sh '''
                    set -eu
                    test -f backend/package-lock.json
                    test -f frontend/package-lock.json
                    test -f kubernetes/backend.yaml
                    test -f kubernetes/frontend.yaml
                    echo "Repository structure checks passed."
                '''
            }
        }

        stage('Backend Tests') {
            steps {
                dir('backend') {
                    sh '''
                        set -eu
                        npm ci
                        npx jest --runInBand --watchAll=false --detectOpenHandles --coverage
                    '''
                }
            }
        }

        stage('Frontend Production Build') {
            steps {
                dir('frontend') {
                    sh '''
                        set -eu
                        npm ci
                        npm run build
                    '''
                }
            }
        }

        stage('Kubernetes Manifest Validation') {
            steps {
                sh '''
                    set -eu
                    kubectl apply --dry-run=client -f kubernetes/
                '''
            }
        }

        stage('Dependency Audit') {
            steps {
                sh '''
                    set +e
                    npm --prefix backend audit --omit=dev
                    backend_status=$?
                    npm --prefix frontend audit --omit=dev
                    frontend_status=$?
                    set -e

                    if [ "$backend_status" -ne 0 ] || [ "$frontend_status" -ne 0 ]; then
                        echo "Dependency audit found issues. Review the audit output."
                        exit 1
                    fi
                '''
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'backend/coverage/**,frontend/dist/**',
                allowEmptyArchive: true
        }
    }
}
