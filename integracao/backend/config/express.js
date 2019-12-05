var express = require('express');

var alunosRouter = require("../routes/alunos.js");
var campisRouter = require("../routes/campus.js");

var bodyParser = require('body-parser');
const path = require("path");
const cors = require('cors');


module.exports = function(){
    var app = express();
    app.set("port", 3001);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());

    
    app.use(express.static("./public"));

    alunosRouter(app);
    campisRouter(app);

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
    
    return app;
};

