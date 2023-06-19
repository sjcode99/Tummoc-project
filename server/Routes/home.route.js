const { Router } = require('express');
const homeRouter = Router();

homeRouter.get('/', (req, res) => {
    res.send({ msg: 'Home Route' });
});

module.exports = { homeRouter };
