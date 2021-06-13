var awsIot = require('aws-iot-device-sdk');

var faceRecogSys = awsIot.device({
    keyPath : "./credentials/recogsys/4ddaa9d457-private.pem.key",
    certPath : "./credentials/recogsys/4ddaa9d457-certificate.pem.crt",
    caPath : "./credentials/recogsys/rootCA1.pem", 
    clientId : "faceRecogSys",
    host : "a2zo8gcb4368m8-ats.iot.ap-northeast-2.amazonaws.com"
});

faceRecogSys.on('connect', () => {
    console.log('Face Recognition System connected');
    faceRecogSys.subscribe('faceRecog/request', () => {
        console.log('subscribing to the topic faceRecog/request !');
    });
    
    var registeredImage = ['gildong', 'simcheong', 'heungboo', 'nolboo', 'ggachi'];
    faceRecogSys.on('message', (topic, message) => {
        console.log('Request:', message.toString());
        if(topic != 'faceRecog/request') return;
        var req = JSON.parse(message.toString());
        var id = registeredImage.indexOf(req.image);
        if(id != -1) {
            faceRecogSys.publish(req.notify, JSON.stringify({ 'image' : req.image, 'command' : 'unlock'}));
        }else {
            faceRecogSys.publish(req.notify, JSON.stringify({ 'image' : req.image, 'command' : 'reject'}));
        }
    })
})
