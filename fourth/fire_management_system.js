const awsIot = require('aws-iot-device-sdk');

const fireManagement = awsIot.device({
    keyPath : "./credentials/managementSys/15e3b052b7-private.pem.key",
    certPath : "./credentials/managementSys/15e3b052b7-certificate.pem.crt",
    caPath : "./credentials/managementSys/rootCA1.pem", 
    clientId : "fireManagementSys",
    host : "a2zo8gcb4368m8-ats.iot.ap-northeast-2.amazonaws.com"
});

fireManagement.on('connect', () => {
    console.log('Fire Management connected');
    fireManagement.subscribe('fire/alarm', () => {
        console.log('subscribing to the topic fire/alarm !');
    });

    fireManagement.on('message', (topic, message) => {
        console.log('Request : ', message.toString());
        if(topic != 'fire/alarm') return;
        const req = JSON.parse(message.toString());
        if(req.fireState){
            fireManagement.publish(req.sprinkler, JSON.stringify( {'command' : 'active'}));
            fireManagement.publish(req.alert, JSON.stringify( {'command' : 'fire'}));
        }
    })
});