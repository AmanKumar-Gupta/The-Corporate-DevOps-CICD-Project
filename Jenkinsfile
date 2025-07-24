
pipeline {
    agent any
    
    tools {
        nodejs 'nodejs23'
    }

    environment {
        SCANNER_HOME = tool 'sonar-scanner'
    }
    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'k8-deployment', url: 'https://github.com/AmanKumar-Gupta/The-Corporate-DevOps-CICD-Project.git'
            }
        }
        
        stage('Frontend Compilation') {
            steps {
                dir('client') {
                    sh 'find . -name "*.js" -exec node --check {} +'
                }
            }
        }
        
        stage('Backend Compilation') {
            steps {
                dir('api') {
                    sh 'find . -name "*.js" -exec node --check {} +'
                }
            }
        }
        
        stage('GitLeaks Scan') {
            steps {
                sh 'gitleaks detect --source ./client --exit-code 1'
                sh 'gitleaks detect --source ./api --exit-code 1'
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonar') {
                    sh ''' $SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=NodeJS-Project \
                            -Dsonar.projectKey=NodeJS-Project '''
                }
            }
        }
        stage('Quality Gate Check') {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    waitForQualityGate abortPipeline: false, credentialsId: 'sonar-token'
                }
            }
        }
        stage('Trivy FS Scan') {
            steps {
                sh 'trivy fs --format table -o fs-report.html .'
            }
        }
        
        stage('Build-Tag & Push Backend Docker Image') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-cred') {
                        dir('api') {
                            sh 'docker build -t amankumargupta/backend:latest .'
                            sh 'trivy image --format table -o backend-image-report.html amankumargupta/backend:latest '
                            sh 'docker push amankumargupta/backend:latest'
                           
                        }
                    }
                }
            }
        }  
            
        stage('Build-Tag & Push Frontend Docker Image') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-cred') {
                        dir('client') {
                            sh 'docker build -t amankumargupta/frontend:latest .'
                            sh 'trivy image --format table -o frontend-image-report.html amankumargupta/frontend:latest '
                            sh 'docker push amankumargupta/frontend:latest'
                        }
                    }
                }
            }
             
        }  
        
        stage('K8-deploy') {
            steps {
                script {
                    withKubeConfig(caCertificate: '', clusterName: 'devopsshack-cluster', contextName: '', credentialsId: 'k8-token', namespace: 'webapps', restrictKubeConfigAccess: false, serverUrl: 'https://033DA018D981DD089D5FCBCB7F816E76.sk1.ap-south-1.eks.amazonaws.com') {
                            sh 'kubectl apply -f k8s-config/sc.yaml -n webapps'
                            sh 'kubectl apply -f k8s-config/mysql.yaml -n webapps'
                            sh 'kubectl apply -f k8s-config/backend.yaml -n webapps'
                            sh 'kubectl apply -f k8s-config/frontend.yaml -n webapps'
                            sleep 30
                        }
                }
            }
        }
        
        stage('verify-K8-deploy') {
            steps {
                script {
                    withKubeConfig(caCertificate: '', clusterName: 'devopsshack-cluster', contextName: '', credentialsId: 'k8-token', namespace: 'webapps', restrictKubeConfigAccess: false, serverUrl: 'https://033DA018D981DD089D5FCBCB7F816E76.sk1.ap-south-1.eks.amazonaws.com') {
                            sh 'kubectl get pods -n webapps'
                            sh 'kubectl get svc -n webapps'
                            
                        }
                }
            }
        }
        
            
    }
}