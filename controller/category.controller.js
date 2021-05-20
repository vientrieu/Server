const Category = require('../model/Category');
module.exports = {
    find: async (req, res) => {
        Category.find({}, 'code name')
        .then((result) => {
            // console.log(result);
            res.json(result);
        })
        .catch((ex) => {
            res.status(404).json({"message": "error!"});
        });
    },

    findById: async (req, res) => {
        Category.findOne({ code: `${req.params.id}` }, 'code name')
        .then((result) => {
            res.json(result);
        })
        .catch((ex) => {
            res.status(404).json({"message": "error!"});
        });
    }
}