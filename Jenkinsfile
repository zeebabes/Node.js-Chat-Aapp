pipeline {
  agent any

  environment {
    ANSIBLE_HOST_KEY_CHECKING = 'False'
  }

  stages {
    stage('Checkout Code') {
      steps {
        git branch: 'main', url: 'https://github.com/zeebabes/chat-app.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Run Ansible Deployment') {
      steps {
        sh 'ansible-playbook -i inventory.ini deployment.yml'
      }
    }
  }

  post {
    failure {
      echo "Deployment failed"
    }
    success {
      echo "Deployment successful"
    }
  }
}
