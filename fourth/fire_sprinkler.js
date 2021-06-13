const awsIot = require('aws-iot-device-sdk');

const fireSprinkler = awsIot.device({
    keyPath : "./credentials/sprinkler/d095c5313f-private.pem.key",
    certPath : "./credentials/sprinkler/d095c5313f-certificate.pem.crt",
    caPath : "./credentials/sprinkler/rootCA1.pem", 
    clientId : "fireSprinkler1",
    host : "a2zo8gcb4368m8-ats.iot.ap-northeast-2.amazonaws.com"
});

fireSprinkler.on('connect', () => {
    console.log('Fire Sprinkler connected');
    fireSprinkler.subscribe('fire/sprinkler', () => {
        console.log('subscribing to the topic fire/sprinkler !');
    });

    fireSprinkler.on('message', (topic, message) => {
        console.log('Request : ', message.toString());
        if(topic != 'fire/sprinkler') return;
        const req = JSON.parse(message.toString());
        if(req.command === 'active'){
            console.log('Fire Sprinkler1 :  Active');
        }
    })
});