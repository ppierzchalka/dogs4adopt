const express = require('express');
const saver = require('../mongodb-saver');
const fs = require('fs')
const router = new express.Router();

//Sets about page url
router.get('/scrape', async (req, res) => {
    try {
        const merged = await saver.readAndMerge();
        const saved = await saver.saveDogs(merged);
        res.send(`Successfully saved documents to database!`)
        console.log(`Successfully saved documents to database!`)
    } catch (error) {
        res.status(500).send(error);
        fs.appendFileSync('./logs/errors.log', `${new Date()}: Error: ${error} \n`);
    }
});

module.exports = router