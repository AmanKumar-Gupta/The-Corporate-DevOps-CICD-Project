resource "aws_instance" "jenkins" {
  ami           = "ami-0f918f7e67a3323f0" # Replace with a valid Jenkins AMI
  instance_type = "t2.medium"
  key_name      = "office-laptop"
  security_groups = ["launch-wizard-1"]

  user_data = <<-EOF
    #!/bin/bash
    sudo apt-get update -y
    sudo apt-get install -y fontconfig openjdk-21-jre wget gnupg
    sudo mkdir -p /etc/apt/keyrings
    sudo wget -O /etc/apt/keyrings/jenkins-keyring.asc https://pkg.jenkins.io/debian/jenkins.io-2023.key
    echo "deb [signed-by=/etc/apt/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
    sudo apt-get update -y
    sudo apt-get install -y jenkins
    sudo systemctl start jenkins
    sudo systemctl enable jenkins
  EOF

  tags = {
    Name = "Jenkins-Instance"
  }
}