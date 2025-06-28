provider "aws" {
  region = "ap-south-1"
}

resource "aws_instance" "server" {
  ami               = "ami-0f918f7e67a3323f0" # Replace with a valid Jenkins AMI
  instance_type     = "t2.small"
  key_name          = "office-laptop"
  security_groups   = ["launch-wizard-1"]

  user_data = <<-EOF
    #!/bin/bash
    sudo apt update -y

    # Install AWS CLI
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    unzip awscliv2.zip
    sudo ./aws/install

    # Install Terraform
    wget -O - https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(grep -oP '(?<=UBUNTU_CODENAME=).*' /etc/os-release || lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
    sudo apt update && sudo apt install -y terraform

    # Install kubectl
    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
    sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

    # Install eksctl
    curl -sLO "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz"
    tar -xzf eksctl_$(uname -s)_amd64.tar.gz
    sudo mv eksctl /usr/local/bin

    # Upgrade packages
    sudo apt update && sudo apt upgrade -y

    # Install Helm
    curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

    wget https://get.helm.sh/helm-v3.14.0-linux-amd64.tar.gz
    tar -zxvf helm-v3.14.0-linux-amd64.tar.gz
    sudo mv linux-amd64/helm /usr/local/bin/helm
  EOF

  tags = {
    Name = "server"
  }
}