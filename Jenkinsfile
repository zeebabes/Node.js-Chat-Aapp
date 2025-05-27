pipeline {
  agent any

  environment {
    ANSIBLE_HOST_KEY_CHECKING = 'False'
  }

  stages {
    stage('Checkout Code') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Deploy with Ansible') {
      steps {
        sh 'ansible-playbook -i inventory.ini deployment.yml'
      }
    }
  }

  post {
    success {
      echo ' Deployment complete!'
    }
    failure {
      echo ' Deployment failed.'
    }
  }
}
