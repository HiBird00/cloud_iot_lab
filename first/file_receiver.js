const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://3.23.76.209:1883');
const AWS = require('aws-sdk');

AWS.config.region = 'ap-northeast-2';
AWS.config.apiVersion = {
    s3 : '2006-03-01',
}

const s3 = new AWS.S3();

// Get an Object list
const listObjects = (params) => {
    return new Promise((resolve, reject) => {
        s3.listObjects(params, (err, data) => {
            if(err) reject(err);
            else resolve(data);
        })
    })
}

// Create new Object
const createObject = (params) => {
    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if(err) reject(err);
            else resolve(data);
        })
    })
}

client.on('connect', async() => {
    console.log('connect!');
    console.log("-- List the Objects in the Bucket --");
    const res = await listObjects({Bucket : "receiver-s3-v1"});
    console.log(res);
    client.subscribe('file');
});

client.on('message', async(topic, message) => {
    console.log("copy data : " + message.toString());
    const data = {
        Bucket : "receiver-s3-v1",
        Key : 'file_from_sender.txt',
        Body : message.toString()
    }
    await createObject(data);
    console.log("copy successed!!");
    console.log("-- List the Objects in the Bucket --");
    const res = await listObjects({Bucket : "receiver-s3-v1"});
    console.log(res);
    client.end();
})
