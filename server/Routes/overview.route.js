const { Router } = require('express');
const CityModel = require('../Models/city.model');
const overviewRouter = Router();


// end point: /overview/city --> used to add city
overviewRouter.post('/city', async (req, res) => {
    const { name } = req.body;
    const { user_id } = req.headers;
    try {
        const city = new CityModel({ userId: user_id, name });
        await city.save();
        res.status(201).send({ status: "Ok", msg: "Successfully saved City" })
    } catch (err) {
        res.send({ status: "Error", msg: err.message })
    }
});

// end point: /overview/get ---> To combine data pulling using aggregation and populate;

// 1: Aggregating the number of locations created by each user
overviewRouter.get('/noOfLocation', async (req, res) => {
    try {
        let data = await CityModel.aggregate([
            {
                $group: {
                    _id: '$userId',
                    count: { $sum: 1 },
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user',
                },
            },
        ])
        res.status(200).send({ msg: `Successfully get location created by particular user`, data })
    } catch (err) {
        res.send({ status: "Error", msg: err.message })
    }
});

// 2: Finding the most popular location
overviewRouter.get('/mostPoularLocation', async (req, res) => {
    try {
        let data = await CityModel.aggregate([
            {
                $group: {
                    _id: '$name',
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { count: -1 },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
        ])
        res.status(200).send({ msg: `Successfully get popular location created by particular user`, data })
    } catch (err) {
        res.send({ status: "Error", msg: err.message })
    }
});

// 3: Retrieving all locations and their associated users 
overviewRouter.get('/allLocations', async (req, res) => {
    try {
        let data = await CityModel.find().populate('userId');
        res.status(200).send({ msg: `Successfully get all locations and their associated users`, data })
    } catch (err) {
        res.send({ status: "Error", msg: err.message })
    }
});


module.exports = { overviewRouter };
