const bodyParser = require('body-parser');
const express = require('express');
const Blockchian = require('./blockchain');
const PubSub = require('./pubsub')

const app = express();
const blockchain = new Blockchian();
const pubsub = new PubSub({ blockchain })

setTimeout(() => pubsub.broadcastChain(), 2000);

app.use(bodyParser.json());

app.get('/api/blocks', (req, res) => {
    res.json(blockchain.chain);
});

app.post('/api/mine', (req, res) =>{
    const { data } = req.body;

    blockchain.addBlock({ data });

    res.redirect('/api/blocks');
});

const PORT = 3000;

app.listen(PORT, () => {
   console.log(`listening at localhost:${PORT}`) ;
})