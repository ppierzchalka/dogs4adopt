const express = require('express');
const Dog = require('../models/dog');
const router = new express.Router();

// Sets all dogs list page url
router.get('/api/all', async (req, res) => {
    try {
        const data = await Dog.find({})
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
    } catch (e) {
        res.status(500).send()
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
    } catch (e) {
        res.status(500).send()
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
    } catch (e) {
        res.status(500).send()
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
    }
})

module.exports = router