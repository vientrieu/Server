const Marker = require('../model/Marker');
const TrafficSign = require('../model/TrafficSign');
const TeachableMachine = require("@sashido/teachablemachine-node");
const fs = require('fs');
const { deleteMany } = require('../model/Marker');
const model = new TeachableMachine({
    modelUrl: "https://teachablemachine.withgoogle.com/models/sGo6vlJDm/"
});
module.exports = {
    save: async (req, res) => {
        if (req.body.code === undefined) {
            if (req.file === undefined) return res.status(400).json(
                {
                    "message": "Bad request!"
                }
            )
            console.log(req.file);
            var urlPic = 'http://localhost:3000/upload/' + req.file.filename;
            model.classify({
                imageUrl: urlPic
            })
                .then((predictions) => {
                    if (predictions[0].score >= 0.5) {
                        var marker = new Marker(
                            {
                                latitude: req.body.latitude || null,
                                longitude: req.body.longitude || null,
                                trafficSignCode: predictions[0].class,
                                goodVote: 0,
                                badVote: 0
                            }
                        );
                        marker.save()
                            .catch((err) => { })
                            .then(() => {
                                var result = [];
                                result.push(predictions[0]);
                                res.status(201).json(result);
                            })
                    }
                    else {
                        res.json(predictions);
                    }
                    try {
                        fs.unlinkSync(req.file.path);
                    }
                    catch (err) {
                        console.error(err);
                    }
                })
                .catch((err) => {
                    res.status(400).json({ "message": "Something went wrong!" });
                });
        }
        else {
            var marker = new Marker(
                {
                    latitude: req.body.latitude || null,
                    longitude: req.body.longitude || null,
                    trafficSignCode: req.body.code,
                    goodVote: 0,
                    badVote: 0
                }
            );
            marker.save()
                .catch((err) => { })
                .then((result) => {
                    res.json(result);
                })
        }
    },

    find: async (req, res) => {
        Marker.find()
            .lean()
            .then(async (markers) => {
                return Promise.all(markers.map((marker) => {
                    return TrafficSign.findOne({ code: marker.trafficSignCode })
                        .then((trafficSigns) => {
                            return ({ ...marker, trafficSignName: trafficSigns.name, danger: trafficSigns.categoryCode === "BBNH" ? true : false });
                        })
                }));
            })
            .then(results => res.json(results))
            .catch((ex) => {
                res.status(404).json({ "message": "error!" });
            });
    },

    findOne: async (req, res) => {
        Marker.findOne({ _id: `${req.params.id}` })
            .lean()
            .then(async (marker) => {
                return TrafficSign.findOne({ code: marker.trafficSignCode })
                    .then((trafficSign) => {
                        // console.log({ ...marker, trafficSignName: trafficSign.name });
                        //return ({ ...marker, trafficSignName: trafficSign.name });
			return ({ ...marker, trafficSignName: trafficSigns.name, danger: trafficSigns.categoryCode === "BBNH" ? true : false });
                    })
            })
            .then(result => res.json(result))
            .catch((ex) => {
                res.status(404).json({ "message": "error!" });
            });
    },

    deleteMany: async (req, res) => {
        Marker.deleteMany({}, (err) => { });
    }

}