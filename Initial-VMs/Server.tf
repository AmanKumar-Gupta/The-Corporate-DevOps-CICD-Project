provider "aws" {
  region = "ap-south-1"
}

resource "aws_instance" "server" {
  ami           = "ami-0f918f7e67a3323f0" # Replace with a valid Jenkins AMI
  instance_type = "t2.small"
  key_name      = "office-laptop"
  security_groups = ["launch-wizard-1"]

  user_data = <<-EOF
    #!/bin/bash
    sudo apt update -y
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    unzip awscliv2.zip
    sudo ./aws/install
    wget -O - https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(grep -oP '(?<=UBUNTU_CODENAME=).*' /etc/os-release || lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
    sudo apt update && sudo apt install -y terraform
  EOF

  tags = {
    Name = "server"
  }
}