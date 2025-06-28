resource "aws_instance" "sonarqube" {
  ami           = "ami-0f918f7e67a3323f0" # Replace with a valid Jenkins AMI
  instance_type = "t2.small"
  key_name      = "office-laptop"
  security_groups = ["launch-wizard-1"]

  user_data = <<-EOF
    #!/bin/bash
    sudo apt update -y
    sudo apt-get update -y
    sudo apt install -y docker.io
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -aG docker $USER
    docker run -d --name sonarqube -p 9000:9000 sonarqube:lts-community
  EOF

  tags = {
    Name = "SonarQube Instance"
  }
}
