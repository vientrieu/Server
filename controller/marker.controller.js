const Marker = require('../model/Marker');
const TrafficSign = require('../model/TrafficSign');
const TeachableMachine = require('@sashido/teachablemachine-node');
const util = require('../util/helper.util');
const config = require('../config/config.json');
const model = new TeachableMachine({
    modelUrl: 'https://teachablemachine.withgoogle.com/models/tWFiL3VM0/'
});

module.exports = {
    save: async (req, res) => {
        Marker.findOne({ latitude: req.body.latitude, longitude: req.body.longitude })
            .then((marker) => {
                if (marker != null) {
                    if (req.file != undefined)
                        util.deleteFile(req.file.path || null);
                    return res.status(400).json({ message: 'Markers already exist' });
                }
                else if (req.body.code === undefined) {
                    if (req.file === undefined)
                        return res.status(400).json({ message: 'Bad request!' });
                    else {
                        var urlPic = config.HOST + req.file.filename;
                        model.classify({ imageUrl: urlPic })
                            .then((predictions) => {
                                if (predictions[0].score >= 0.7) {
                                    console.log("ifffffffffff");
                                    TrafficSign.findOne({ code: predictions[0].class })
                                        .then((trafficSign) => {
                                            var marker = new Marker(
                                                {
                                                    latitude: req.body.latitude || null,
                                                    longitude: req.body.longitude || null,
                                                    trafficSignCode: predictions[0].class,
                                                    trafficSignName: trafficSign.name,
                                                    danger: trafficSign.categoryCode === 'BBNH' ? true : false,
                                                    goodVote: 0,
                                                    badVote: 0
                                                }
                                            );
                                            marker.save()
                                                .catch((err) => { })
                                                .then((result) => {
                                                    var rs = [];
                                                    rs.push(result);
                                                    return res.json(rs);
                                                })
                                        })
                                        .catch(() => {
                                            return res.status(400).json({ message: 'Your code error!' });
                                        })
                                } else {
                                    let rs = [];
                                    rs.push(predictions[0]);
                                    rs.push(predictions[1]);
                                    rs.push(predictions[2]);
                                    return res.json(rs);
                                };
                            })
                            .then(() => util.deleteFile(req.file.path || null))
                            .catch((err) => {
                                return res.status(400).json({ message: 'Something went wrong!' });
                            });
                    }
                }
                else {
                    if (req.file != undefined)
                        util.deleteFile(req.file.path || null);
                    var trafficCode = req.body.code.substr(2);
                    TrafficSign.findOne({ code: trafficCode })
                        .then((trafficSign) => {
                            var marker = new Marker(
                                {
                                    latitude: req.body.latitude || null,
                                    longitude: req.body.longitude || null,
                                    trafficSignCode: trafficCode,
                                    trafficSignName: trafficSign.name,
                                    danger: trafficSign.categoryCode === 'BBNH' ? true : false,
                                    goodVote: 0,
                                    badVote: 0
                                }
                            );
                            marker.save()
                                .catch((err) => { })
                                .then((result) => {
                                    let rs = [];
                                    rs.push(result);
                                    return res.json(rs);
                                })
                        })
                        .catch(() => {
                            return res.status(400).json({ message: 'Your code error!' });
                        })
                };
            })
            .catch((err) => {
                return res.status(400).json({ message: 'Something went wrong!' })
            })
    },

    find: async (req, res) => {
        Marker.find()
            .lean()
            .then(results => res.json(results))
            .catch((ex) => {
                res.status(404).json({ message: 'Find all error!' });
            });
    },

    findOne: async (req, res) => {
        Marker.findOne({ _id: `${req.params.id}` })
            .lean()
            .then(result => res.json(result))
            .catch((ex) => {
                res.status(404).json({ message: 'Find one error!' });
            });
    },

    deleteMany: async (req, res) => {
        Marker.deleteMany({}, (err) => { });
        res.json({ message: 'deleted!' });
    }

}