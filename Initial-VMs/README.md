# Initial-VMs Project

This project contains Terraform configurations for deploying various EC2 instances with specific software installations. Below are the details for each instance:

## EC2 Instances

1. **Jenkins Instance**
   - File: `jenkins-instance.tf`
   - Description: This configuration defines an EC2 instance with Jenkins installed. It includes necessary resource configurations such as instance type, AMI, security groups, and user data to install Jenkins.

   Jenkins Plugins:
   sonarqube scanner
   maven integration
   config file provider
   pipeline maven integration
   docker pipeline
   kubernetes 
   kubernetes credentials
   kubernetes client api
   kubernetes cli 
   generic webhook trigger


2. **SonarQube Instance**
   - File: `sonarqube-instance.tf`
   - Description: This configuration defines an EC2 instance with SonarQube installed. It includes similar resource configurations as the Jenkins instance, tailored to install SonarQube via user data.

3. **Nexus Instance**
   - File: `nexus-instance.tf`
   - Description: This configuration defines an EC2 instance with Nexus installed. It specifies the instance type, AMI, security groups, and user data for installing Nexus.

4. **Tools Instance**
   - File: `tools-instance.tf`
   - Description: This configuration defines an EC2 instance with AWS CLI, Terraform, and Ekstc installed. It includes the required configurations for the instance and user data to install these tools.

## Deployment Instructions

To deploy the EC2 instances, follow these steps:

1. Ensure you have Terraform installed on your local machine.
2. Navigate to the `Initial-VMs` directory in your terminal.
3. Initialize Terraform:
   ```
   terraform init
   ```
4. Review the planned actions:
   ```
   terraform plan
   ```
5. Apply the configuration to create the instances:
   ```
   terraform apply
   ```
6. Follow the output instructions to access the deployed instances.

## Notes

- Make sure to configure your AWS credentials and region before running the Terraform commands.
- Modify the instance types and AMIs in the `.tf` files as per your requirements.