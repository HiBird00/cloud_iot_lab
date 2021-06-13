const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.region = 'ap-northeast-2';
AWS.config.apiVersion = {
    s3 : '2006-03-01',
}

const s3 = new AWS.S3();

// Create new Object
const createObject = (params) => {
    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if(err) reject(err);
            else resolve(data);
        })
    })
}

const file = 'task1_text.txt';
const data = fs.readFileSync(file);

const params = {
    Bucket : "buckettask1",
    Key : 'task1_text_copy.txt',
    Body : data.toString()
}

const test = async() => {
    const res = await createObject(params);
    console.log(res);
}

test();
