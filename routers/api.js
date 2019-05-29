const express = require('express');
const fs = require('fs');
const Dog = require('../models/dog');
const router = new express.Router();

// Sets all dogs list page url
router.get('/api/all', async (req, res) => {
    const _limit = req.query.limit
    const _page = req.query.page
    let data;
    try {
        if (_limit && _page) {
            data = await Dog.paginate({}, {
                limit: _limit,
                page: _page
            });
        } else {
            data = await Dog.find({})
        }
        res.send(data);
    } catch (error) {
        res.status(500).send()
    }
});

router.get('/api/shelterNames', async (req, res) => {
    try {
        data = await Dog.aggregate([{
            $group: {
                "_id": {
                    location: '$location',
                    dataLocation: '$dataLocation'
                },
            }
        }]);
        res.send(data)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/api/shelter/:dataLocation', async (req, res) => {
    const _dataLocation = req.params.dataLocation
    const _limit = req.query.limit
    const _page = req.query.page
    let data;
    try {
        if (_limit && _page) {
            data = await Dog.paginate({
                dataLocation: _dataLocation
            }, {
                limit: _limit,
                page: _page
            });
        } else {
            data = await Dog.find({
                dataLocation: _dataLocation
            })
        }
        if (!data) {
            return res.status(404).send()
        }
        res.send(data)
    } catch (error) {
        res.status(500).send()
        fs.appendFileSync('./logs/errors.log', `${new Date()}: Error: ${error} \n`);
    }
})

router.get('/api/id/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const data = await Dog.findById(_id)
        if (!data) {
            return res.status(404).send()
        }
        res.send(data)
    } catch (error) {
        res.status(500).send()
        fs.appendFileSync('./logs/errors.log', `${new Date()}: Error: ${error} \n`);
    }
})

router.get('/api/name/:dogName', async (req, res) => {
    const _dogName = req.params.dogName
    const _limit = req.query.limit
    const _page = req.query.page
    let data;
    try {
        if (_limit && _page) {
            data = await Dog.paginate({
                "name": {
                    "$regex": _dogName.toLowerCase(),
                    "$options": "i"
                }
            }, {
                limit: _limit,
                page: _page
            });
        } else {
            data = await Dog.find({
                "name": {
                    "$regex": _dogName.toLowerCase(),
                    "$options": "i"
                }
            })
        }
        if (!data) {
            return res.status(404).send()
        }
        res.send(data)
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