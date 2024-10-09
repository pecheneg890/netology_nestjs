const express = require('express');
const router = express.Router();
const characterService = require('../service/character.service');

router.get('/character', async (req, res) => {
    const resp = await characterService.getOne(req.query.id);
    if (resp) {
        res.json(resp);
    } else {
        res.status(404);
        res.json('Code: 404');
    }
});

router.get('/characters', async (req, res) => {
    const resp = await characterService.getAll();
    res.json(resp);
});

module.exports = router;

