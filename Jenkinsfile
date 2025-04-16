pipeline {
  agent any

  stages {
    stage('Clone Repo') {
      steps {
        git url: 'https://github.com/vpstackhub/radioitaliacast-backend.git', branch: 'main'
      }
    }

    stage('Build Image') {
      steps {
        sh 'docker build -t vpstackhub/radioitaliacast-backend:1.0 .'
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
          sh 'echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin'
          sh 'docker push vpstackhub/radioitaliacast-backend:1.0'
        }
      }
    }

    stage('Deploy to EC2') {
      steps {
        sh '''
        ssh -o StrictHostKeyChecking=no -i /path/to/your.pem ec2-user@13.58.141.188 '
          docker stop radioitaliacast-backend || true &&
          docker rm radioitaliacast-backend || true &&
          docker pull vpstackhub/radioitaliacast-backend:1.0 &&
          docker run -d -p 3000:3000 --name radioitaliacast-backend vpstackhub/radioitaliacast-backend:1.0
        '
        '''
      }
    }
  }
}
