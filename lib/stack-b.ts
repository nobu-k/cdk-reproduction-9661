import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as iam from '@aws-cdk/aws-iam';

export interface StackBProps extends cdk.StackProps {
  principal: iam.IGrantable;
}

export class StackB extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: StackBProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'Bucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    bucket.grantRead(props.principal);
  }
}
