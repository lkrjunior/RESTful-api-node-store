var express = require('express');
var router = express.Router();
const Store = require('data-store');
const store = new Store({ path: 'config.json' });
const URL = 'http://localhost:3000';
const RESOURCE = 'territorio';
const util = require('util');
const EMPTY = '';

router.put('/', function(req, res) {
    let territorio = req.body;
    let generatedId =  `${RESOURCE}:${Math.floor(Math.random()*10)}`;
    territorio.href = `${URL}/territorio/${generatedId}`;
    territorio.id = generatedId;
    store.set(generatedId.toString(), territorio);
    
    res.setHeader('Content-Type', 'application/json');
    res.status(201);
    res.send(JSON.stringify(territorio));
});

router.get('/:id', function(req, res, next)
{
    let id = req.params['id'];
    let territorio = store.get(id.toString());
    console.log(territorio);

    res.setHeader('Content-Type', 'application/json');
    if (territorio != null)
    {
        res.status(200);
        res.send(JSON.stringify(territorio));
    }
    else
    {
        res.status(404).send('Território não encontrado!')
    }
});

router.delete('/:id', function(req, res, next)
{
    let id = req.params['id'];
    store.del(id.toString());
    
    res.setHeader('Content-Type', 'application/json');
    res.status(202);
    res.send();
});


module.exports = router;
