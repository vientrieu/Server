const express = require('express');
const path = require('path');
const config = require('./config/config');
const bodyParser = require('body-parser');
const PORT = config.PORT;
const URL = config.MONGO_URL;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'public')));
require('./database/mongoDB')(URL);
require('./middleware/routes.mdw')(app);
app.get('/', (req, res) => {
    res.send('aaaaaaaaaaaa');
})
app.listen(PORT||process.env.PORT, () => {
    console.log(__dirname);
    console.log("server use port ", PORT);
})
