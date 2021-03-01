const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js')

const server = express();

const uri = 'mongodb+srv://dbBlog:TMVDSvX52JXPrzA9@cluster0.g4h1b.mongodb.net/schtrompfsDatabase?retryWrites=true&w=majority';
const options = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

server.use(bodyParser.json());

server.use(bodyParser.urlencoded({ extended: true }));

routes(server);

server.listen(3000, () => {

    mongoose.connect(uri, options)
        .then(
            () => { console.log('Connexion à mongoDB établie'); },
            err => { console.warn('Erreur durant la connexion ', err); });

});