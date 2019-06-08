const express = require('express');
const fs = require('fs');
const Dog = require('../models/dog');
const router = new express.Router();


router.get('/api/shelters', async (req, res) => {
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

router.get('/api/shelters/:dataLocation', async (req, res) => {
    const _dataLocation = req.params.dataLocation
    const _limit = req.query.limit || 10;
    const _page = req.query.page || 1;
    const _dogName = req.query.name
    let data;
    try {
        if (_dogName) {
            data = await Dog.paginate({
                "name": {
                    "$regex": _dogName.toLowerCase(),
                    "$options": "i"
                },
                dataLocation: _dataLocation
            }, {
                limit: _limit,
                page: _page
            });
        } else {
            data = await Dog.paginate({
                dataLocation: _dataLocation
            }, {
                limit: _limit,
                page: _page
            });
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

router.get('/api/dogs', async (req, res) => {
    const _limit = req.query.limit || 10;
    const _page = req.query.page || 1;
    const _dogName = req.query.name
    let data;
    try {
        if (_dogName) {
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
            data = await Dog.paginate({}, {
                limit: _limit,
                page: _page
            });
        }
        res.send(data);
    } catch (error) {
        res.status(500).send()
        console.log(error)
    }
});

router.get('/api/dogs/:id', async (req, res) => {
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

router.get('/api/random', async (req, res) => {
    const _count = req.query.count || 5
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