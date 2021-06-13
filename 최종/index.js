const AWS = require('aws-sdk');
const { access_key, secret_key } = require('./credential');
const bucket = 'db4image' // the bucketname without s3://
AWS.config.update({
    accessKeyId: access_key,
    secretAccessKey: secret_key,
    region:'ap-northeast-2'
});
const iotdata = new AWS.IotData({
    endpoint : "a2zo8gcb4368m8-ats.iot.ap-northeast-2.amazonaws.com"
})

const client = new AWS.Rekognition();
const users = ['siwan.jpg', 'gwanghee.jpg', 'jungkook.jpg', 'rm.jpg'];

const test = async(event) => {
    const { image, notify } = event;
    if(!users.includes(image)){
        return false;
    }
    
    const params = {
        SourceImage: {
            S3Object: {
                Bucket: bucket,
                Name: image
            },
        },
        TargetImage: {
            S3Object: {
                Bucket: bucket,
                Name: image
            },
        },
        SimilarityThreshold: 70
    }
    
    const ret = await client.compareFaces(params).promise();
    var command = (ret.FaceMatches[0].Similarity >= 70) ? 'unlock' : 'reject';
    console.log(command);
    var topicParams = {
        topic : notify,
        payload : JSON.stringify({image, command})      
    }
    
    var response = await iotdata.publish(topicParams).promise();
    console.log(response);
}

test({image : "rm.jpg", notify : "faceRecog/notify/door1"});


