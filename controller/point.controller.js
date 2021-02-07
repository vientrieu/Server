const formidable = require('formidable');
const Point = require('../model/point');
const TeachableMachine = require("@sashido/teachablemachine-node");
const model = new TeachableMachine({
    modelUrl: "https://teachablemachine.withgoogle.com/models/cIyZY1Uae/"
});
module.exports = {
    save: async (req, res) => {
        var point = new Point(req.body);
        var form = new formidable.IncomingForm();
        var urlPic;
        form.on('fileBegin', function (name, file) {
            file.path ='public/upload/' + file.name;
            console.log('bbbbbbbbbbbbb');
        });
        form.on('file', function (name, file) {
            urlPic = 'http://localhost:3000/upload/' + file.name;
        });
        form.parse(req, (err, fields, files) => {
            if(!err) {
                return model.classify({
                    imageUrl: urlPic,
                })
                .then((predictions) => {
                    console.log(predictions);
                    return res.json(predictions);
                })
                .catch((e) => {
                    console.error(e);
                    res.status(500).send("Something went wrong!")
                });
            }
        });
        
        // const url = "https://media-blog.sashido.io/content/images/2020/09/SashiDo_Dog.jpg";
        // point.save()
        // .then((result) => {
        //     res.status(201).json(result);
        // })
        // .catch((ex) => {
        //     res.status(404).json({"message": "point is not saved!"});
        // });
    },
    find: async (req, res) => {
        console.log("================");
        Point.find().lean()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((ex) => {
            res.status(404).json({"message": "point is not got!"});
        });
    }
}