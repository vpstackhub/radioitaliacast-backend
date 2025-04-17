pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "vpstackhub/radioitaliacast-backend:1.0"
    }

    stages {
        stage('Build Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $DOCKER_IMAGE
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-key']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ec2-user@13.58.141.188 << EOF
                        docker pull $DOCKER_IMAGE
                        docker stop radioitaliacast-backend || true
                        docker rm radioitaliacast-backend || true
                        docker run -d --name radioitaliacast-backend -p 3000:3000 $DOCKER_IMAGE
                        EOF
                    '''
                }
            }
        }
    }
}
