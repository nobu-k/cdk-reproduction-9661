import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

export class StackA extends cdk.Stack {
  public readonly instance: ec2.Instance;

  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, 'VPC', {
      isDefault: true,
    });

    this.instance = new ec2.Instance(this, 'Instance', {
      instanceType: new ec2.InstanceType('t3a.nano'),
      machineImage: ec2.MachineImage.latestAmazonLinux({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      vpc,
      blockDevices: [{
        deviceName: '/dev/sda1',
        volume: ec2.BlockDeviceVolume.ebs(8, {
          deleteOnTermination: true,
        }),
      }],
    });

    new cdk.CfnOutput(this, 'PublicIp', {
      value: this.instance.instancePublicIp,
    });
    new cdk.CfnOutput(this, 'InstanceId', {
      value: this.instance.instanceId,
    });
    new cdk.CfnOutput(this, 'Az', {
      value: this.instance.instanceAvailabilityZone,
    });
  }
}
