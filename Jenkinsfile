pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'docker build -t webapp .'
      }
    }
    stage('Deploy') {
      when { branch 'main' }
      steps {
        sh 'echo Deploying webapp...'
      }
    }
  }
}
