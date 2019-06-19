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
        res.status(400).send('Território não conhecido!');
    }
    else
    {
        if (sonda.eixoX > territorio.eixoX)
        {
            res.status(400).send('Sonda posicionada em um lugar não permitido: eixoX');
        }
        else if (sonda.eixoY > territorio.eixoY)
        {
            res.status(400).send('Sonda posicionada em um lugar não permitido: eixoY');
        }
        
        let generatedId =  `${RESOURCE}:${Math.floor(Math.random()*10)}`;
        sonda.href = `${URL}/sonda/${generatedId}`;
        sonda.id = generatedId;
        store.set(generatedId.toString(), sonda);

        res.status(200).send(JSON.stringify(sonda));
    }
    
});

router.get('/:id', function(req, res, next)
{
    let id = req.params['id'];
    let sonda = store.get(id.toString());
    console.log(sonda);

    res.setHeader('Content-Type', 'application/json');
    if (sonda != null)
    {
        res.status(200);
        res.send(JSON.stringify(sonda));
    }
    else
    {
        res.status(404).send('Sonda não encontrada!')
    }
});

module.exports = router;
