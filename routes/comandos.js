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
                sonda.eixoX += 1;
                break;
            case 'down':
                sonda.eixoX -= 1;
                break;
            case 'left':
                sonda.eixoY -= 1;
                break;
            case 'right':
                sonda.eixoY += 1;
                break;
            default:
                res.status(400).send('Comando não conhecido!');
                break;
        }
        
        if (sonda.eixoX > territorio.eixoX || sonda.eixoX < 0)
        {
            res.status(400).send('Território não suporta esta movimentação. eixoX!');
        }
        else if (sonda.eixoY > territorio.eixoY || sonda.eixoY < 0)
        {
            res.status(400).send('Território não suporta esta movimentação. eixoY!');
        }
        else
        {
            store.set(sonda.id, sonda);
            res.status(200).send(JSON.stringify(sonda));
        }
    }
    
});

module.exports = router;
