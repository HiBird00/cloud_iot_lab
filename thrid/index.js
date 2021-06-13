const keys = require('./credential.js');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    "accessKeyId": keys.access_key,
    "secretAccessKey": keys.secret_key
});

exports.handler = async (event, context) => {

    const params = {
        Bucket : "buckettask1",
        Key : event.key+".txt",
        Body : event.data
    }

    try {
        const { ContentType } = await s3.upload(params).promise();
        console.log('CONTENT TYPE:', ContentType);
        return ContentType;
    } catch (err) {
        console.log(err);
        const message = `Error uploading object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
        console.log(message);
        throw new Error(message);
    }

}