var express = require('express');
var router = express.Router();
const Store = require('data-store');
const store = new Store({ path: 'config.json' });
const URL = 'http://localhost:3000';
const RESOURCE = 'sonda';
const util = require('util');
const EMPTY = '';

router.put('/', function(req, res) {
    let sonda = req.body;

    let territorio = store.get(sonda.idTerritorio);
    
    res.setHeader('Content-Type', 'application/json');
    if (territorio == null)
    {    
        res.status(400);
    }
    else
    {
        res.status(200);
    }
    res.send(JSON.stringify(sonda));

});

module.exports = router;
