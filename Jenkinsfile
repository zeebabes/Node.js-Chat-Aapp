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
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'ec2-ssh-key',
                    keyFileVariable: 'KEYFILE',
                    usernameVariable: 'SSH_USER'
                )]) {
                    sh """
                        ansible-playbook -i inventory.ini deployment.yml \
                        --private-key=$KEYFILE -u $SSH_USER
                    """
                }
            }
        }
    }
}
