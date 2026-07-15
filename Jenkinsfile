pipeline {

    agent any


    stages {

        stage('Deploy Payment Service') {

            steps {

                script {

                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(

                                configName: 'Ubuntu',

                                verbose: true,

                                transfers: [

                                    sshTransfer(

                                        execCommand: '''
                                            set -e

                                            echo "===== PAYMENT SERVICE DEPLOYMENT STARTED ====="

                                            cd /home/master/project/microservices/payment-service

                                            git fetch origin

                                            git reset --hard origin/main

                                            npm install

                                            if pm2 describe payment-service > /dev/null 2>&1
                                            then
                                                pm2 restart payment-service
                                            else
                                                pm2 start app.js --name payment-service
                                            fi

                                            pm2 save

                                            echo "===== PAYMENT SERVICE DEPLOYED SUCCESSFULLY ====="
                                        '''
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
    }
    post {
        success {
            echo "======================================="
            echo "Payment Service Deployment Successful"
            echo "======================================="
        }
        failure {
            echo "======================================"
            echo "Payment Service Deployment Failed"
            echo "======================================"
        }
        always {
            cleanWs()
        }
    }
}