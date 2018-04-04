import AWS from 'aws-sdk';

AWS.config.region = 'us-west-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-west-2:3a552167-7aa4-4f0f-9aed-f2a8529db1d9',
});

export default new AWS.S3({ params: { Bucket: 'sugarcaddy-dev' } });
