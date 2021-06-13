const awsIot = require('aws-iot-device-sdk');

const fireDetector = awsIot.device({
    keyPath : "./credentials/detector/8e168e94e5-private.pem.key",
    certPath : "./credentials/detector/8e168e94e5-certificate.pem.crt",
    caPath : "./credentials/detector/rootCA1.pem", 
    clientId : "fireDetector1",
    host : "a2zo8gcb4368m8-ats.iot.ap-northeast-2.amazonaws.com"
});

fireDetector.on('connect', () => {
    console.log('Fire Detector connected');
});

const fireState = [true, false];

setInterval(() => {
    var idx = Math.floor(Math.random() * 2);
    var message = { 'sprinkler' : 'fire/sprinkler', 'alert' :  'fire/alert/detector1', 'fireState' : fireState[idx]};
    console.log('publish to fire/alarm' + JSON.stringify(message));
    fireDetector.publish('fire/alarm', JSON.stringify(message));
}, 3000);