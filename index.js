const express = require('express');
const app = express();
var cors = require('cors');
const PORT = process.env.PORT || 3000;
const FCM = require('fcm-node');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var serverKey = require('./private-key.json');

const keyValue = 'e44ccf1c-86d3-4ced-afe0-ddac4163bd75';

var fcm = new FCM(serverKey);
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.post('/notifications', (req, res) => {
    var message = {
        to: req.body.token,

        notification: {
            title: req.body.title,
            body: req.body.body,
        },

        data: {
            my_key: 'my value',
            my_another_key: 'my another value',
        },
    };

    fcm.send(message, function (err, response) {
        if (err) {
            console.log('Something has gone wrong!');
        } else {
            console.log('Successfully sent with response: ', response);
            console.log(response.results[0].error);
        }
    });
    res.send('Send Notifications successfully!!');
});

app.listen(PORT, () => console.log(`server started ${PORT}`));
