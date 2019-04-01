const express = require('express');
const merger = require('../file-merger');
const router = new express.Router();

//Sets about page url
router.get('/scrape/websited/hx7ghwENR9ADU*hX7y&EVA^5SQ9u7HRw!59cr', async (req, res) => {
    try {
        const merged = await merger.readAndMerge();
        const saved = await merger.saveDogs(merged);
        res.send(`Successfully saved documents to database!`)
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router