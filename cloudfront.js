const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

const cloudfront = new AWS.CloudFront();

module.exports = cloudfront;