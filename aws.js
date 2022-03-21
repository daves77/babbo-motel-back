const AWS = require('aws-sdk')

AWS.config.update({region: "ap-southeast-1"})


const s3 = new AWS.S3({apiVersion: '2006-03-01'})


module.export = s3