const express = require('express');
const fs = require('fs');
const Dog = require('../models/dog');
const router = new express.Router();

// Sets all dogs list page url
router.get('/api/all/:limit/:page', async (req, res) => {
    const _limit = req.params.limit
    const _page = req.params.page
    try {
        const data = await Dog.paginate({}, {limit: _limit, page: _page});
        res.send(data);
    } catch (error) {
        res.status(500).send()
    }
});

router.get('/api/shelter/:shelterName', async (req, res) => {
    const _shelterName = req.params.shelterName
    try {
        const dog = await Dog.find({dataLocation: _shelterName})

        if (!dog) {
            return res.status(404).send()
        }

        res.send(dog)
    } catch (error) {
        res.status(500).send()
        fs.appendFileSync('./logs/errors.log', `${new Date()}: Error: ${error} \n`);
    }
})

router.get('/api/id/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const dog = await Dog.findById(_id)

        if (!dog) {
            return res.status(404).send()
        }

        res.send(dog)
    } catch (error) {
        res.status(500).send()
        fs.appendFileSync('./logs/errors.log', `${new Date()}: Error: ${error} \n`);
    }
})

router.get('/api/name/:dogName', async (req, res) => {
    const _dogName = req.params.dogName
    try {
        const dog = await Dog.find({"name": {
            "$regex": _dogName.toLowerCase(),
            "$options": "i"
        }})

        if (!dog) {
            return res.status(404).send()
        }

        res.send(dog)
    } catch (error) {
        res.status(500).send()
        fs.appendFileSync('./logs/errors.log', `${new Date()}: Error: ${error} \n`);
    }
})

router.get('/api/random/:count', async (req, res) => {
    const _count = req.params.count
    try {
        await Dog.findRandom({}, {}, {
        limit: _count
    }, function (error, results) {
        if (!error) {
            res.send(results)
        }
    })
    } catch (error) {
        res.status(500).send()
        fs.appendFileSync('./logs/errors.log', `${new Date()}: Error: ${error} \n`);
    }
})

module.exports = router