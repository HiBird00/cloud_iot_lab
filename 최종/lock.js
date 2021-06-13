var awsIot = require('aws-iot-device-sdk');

var doorLock = awsIot.device({
    keyPath : "./credentials/lock/59b297ea11-private.pem.key",
    certPath : "./credentials/lock/59b297ea11-certificate.pem.crt",
    caPath : "./credentials/lock/rootCA1.pem", 
    clientId : "doorLock1",
    host : "a2zo8gcb4368m8-ats.iot.ap-northeast-2.amazonaws.com"
});

doorLock.on('connect', () => {
    console.log('Door Lock connected');
    doorLock.subscribe('faceRecog/notify/door1', () => {
        console.log('subscribing to the topic faceRecog/notify/door1 !');
    });
    doorLock.on('message', (topic, message) => {
        console.log('Request : ', message.toString());
        if(topic !== 'faceRecog/notify/door1') return;
        const req = JSON.parse(message.toString());
        if(req.command === 'unlock'){
            console.log('Visitor : '+req.image+'  Door Lock : UNLOCK');
        }else if(req.command === 'reject') {
            console.log('Visitor : '+req.image+'  Door Lock : REJECT');
        }
    })
})