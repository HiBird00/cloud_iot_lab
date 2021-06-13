var awsIot = require('aws-iot-device-sdk');

var doorCamera = awsIot.device({
    keyPath : "./credentials/camera/69dec10a2e-private.pem.key",
    certPath : "./credentials/camera/69dec10a2e-certificate.pem.crt",
    caPath : "./credentials/camera/rootCA1.pem", 
    clientId : "doorCamera1",
    host : "a2zo8gcb4368m8-ats.iot.ap-northeast-2.amazonaws.com"
});

doorCamera.on('connect', () => {
    console.log('Door Camera connected');
})

var imagesInStr = ['gildong', 'simcheong', 'heungboo', 'nolboo', 'ggachi'];

setInterval(() => {
    var idx = Math.floor(Math.random() * 5);
    var message = { 'notify' :  'faceRecog/notify/door1', 'image' : imagesInStr[idx]};
    console.log('publish to faceRecog/request' + JSON.stringify(message));
    doorCamera.publish('faceRecog/request', JSON.stringify(message));
}, 3000);