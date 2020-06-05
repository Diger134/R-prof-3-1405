const express = require('express');
const mongo = require('mongoose');


const app = express();

app.use(express.json());

const fs = require('fs')

app.get('/messages', (req, res) => {
    fs.readFile('./server/db/messages.json', 'utf-8', (err, data) => {
        if(!err) {
            let d = JSON.parse(data);
            res.json(d);
        }
    })
})

app.listen(3300, () => {
    console.log('listening @ port 3300');
})