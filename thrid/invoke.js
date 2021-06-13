const AWS = require('aws-sdk');

const lambda = new AWS.Lambda({
    region : "ap-northeast-2"
});

const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
});

const test = async() => {
    const g_params = {
        Bucket : "buckettask1",
        Key : "input.json"
    };
    
    const dataBuffer = await s3.getObject(g_params).promise();
    const data = JSON.parse((dataBuffer.Body).toString());

    var params = {
        FunctionName: 'createS3Object',
        Payload: JSON.stringify(data)
    };

    const result = await (lambda.invoke(params).promise());
    console.log('Success!');
    console.log(result);
}

test();
