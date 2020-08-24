#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { StackA } from '../lib/stack-a';
import { StackB } from '../lib/stack-b';

const oregon = 'us-west-2';

const app = new cdk.App();
const stackA = new StackA(app, 'StackA', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: oregon,
  },
});

new StackB(app, 'StackB', {
  principal: stackA.instance,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: oregon,
  },
});
