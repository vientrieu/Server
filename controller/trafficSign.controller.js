const TrafficSign = require('../model/TrafficSign');
module.exports = {
    find: async (req, res) => {
        TrafficSign.find({}, 'code name')
            .then((result) => {
                // console.log(result);
                res.json(result);
            })
            .catch((ex) => {
                res.status(404).json({ message: 'Find all traffic sign error!' });
            });
    },

    findById: async (req, res) => {
        TrafficSign.findOne({ code: `${req.params.id}` }, 'code name')
            .then((result) => {
                res.json(result);
            })
            .catch((ex) => {
                res.status(404).json({ message: 'Find all traffic sign error!' });
            });
    }
}