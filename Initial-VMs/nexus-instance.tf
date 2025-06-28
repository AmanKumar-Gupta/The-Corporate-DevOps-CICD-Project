resource "aws_instance" "nexus" {
  ami           = "ami-0f918f7e67a3323f0" # Replace with a valid Nexus AMI if available
  instance_type = "t2.small"
  key_name      = "office-laptop"
  security_groups = ["launch-wizard-1"]

  user_data = <<-EOF
    #!/bin/bash
    sudo apt-get update -y
    sudo apt-get install -y fontconfig openjdk-21-jre wget gnupg
    wget https://download.sonatype.com/nexus/3/nexus-3.81.1-01-linux-x86_64.tar.gz
    tar -xvzf nexus-3.81.1-01-linux-x86_64.tar.gz
    mv nexus-3* nexus
    cd nexus
    ./bin/nexus start
  EOF

  tags = {
    Name = "Nexus Instance"
  }
}