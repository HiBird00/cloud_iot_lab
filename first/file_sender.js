const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://3.23.76.209:1883');
const fs = require('fs');

const file = 'test.txt';
const data = fs.readFileSync(file);

client.on('connect', async() => {
    console.log('connect!');
    client.subscribe('file');
    client.publish('file', data);
});

client.on('message', (topic, message) => {
    console.log(topic + ' : send');
    client.end();
})
