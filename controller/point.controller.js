const formidable = require('formidable');
const Point = require('../model/point');
module.exports = {
    save: async (req, res) => {
        var point = new Point(req.body);
        var form = new formidable.IncomingForm();
        form.parse(req);
        form.on('fileBegin', function (name, file) {
            file.path ='./public/upload/' + file.name;
        });
        form.on('file', function (name, file) {
            point.pictureURL = file.path;
        });

        point.save()
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((ex) => {
            res.status(404).json({"message": "point is not saved!"});
        });
    },
    find: async (req, res) => {
        Point.find().lean()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((ex) => {
            res.status(404).json({"message": "point is not got!"});
        });
    }
}