const awsIot = require('aws-iot-device-sdk');

const alertSystem = awsIot.device({
    keyPath : "./credentials/alertSys/c418083155-private.pem.key",
    certPath : "./credentials/alertSys/c418083155-certificate.pem.crt",
    caPath : "./credentials/alertSys/rootCA1.pem", 
    clientId : "alertSystem1",
    host : "a2zo8gcb4368m8-ats.iot.ap-northeast-2.amazonaws.com"
});

alertSystem.on('connect', () => {
    console.log('Fire Alert System connected');
    alertSystem.subscribe('fire/alert/detector1', () => {
        console.log('subscribing to the topic fire/alert/detector1 !');
    });

    alertSystem.on('message', (topic, message) => {
        console.log('Request : ', message.toString());
        if(topic != 'fire/alert/detector1') return;
        const req = JSON.parse(message.toString());
        if(req.command === 'fire'){
            console.log('! FIRE OUTBREAK !');
        }
    })
});