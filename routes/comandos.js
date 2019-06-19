var express = require('express');
var router = express.Router();
const Store = require('data-store');
const store = new Store({ path: 'config.json' });
const URL = 'http://localhost:3000';
const RESOURCE = 'comandos';
const util = require('util');
const EMPTY = '';

router.post('/', function(req, res) {
    let comando = req.body;

    let sonda = store.get(comando.idSonda);
    
    res.setHeader('Content-Type', 'application/json');
    if (sonda == null)
    {    
        res.status(400).send('Sonda não conhecida!');
    }
    else
    {
        let territorio = store.get(sonda.idTerritorio);

        if (territorio == null)
        {    
            res.status(400).send('Território da sonda não conhecido!');
        }

        switch (comando.direcao) 
        {
            case 'up':
                break;
            case 'down':
                break;
            case 'left':
                break;
            case 'right':
                break;
            default:
                break;
        }
        
        res.status(200).send(JSON.stringify(sonda));
    }
    
});

module.exports = router;
