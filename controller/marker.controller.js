const formidable = require('formidable');
const Marker = require('../model/Marker');
const TeachableMachine = require("@sashido/teachablemachine-node");
const model = new TeachableMachine({
    modelUrl: "https://teachablemachine.withgoogle.com/models/cIyZY1Uae/"
});
module.exports = {
    save: async (req, res) => {
        var form = new formidable.IncomingForm();
        var urlPic;
        form.on('fileBegin', function (name, file) {
            file.path ='public/upload/' + file.name;
        });
        form.on('file', function (name, file) {
            urlPic = 'http://localhost:3000/upload/' + file.name;
        });
        form.parse(req, (err, fields, files) => {
            if(!err) {
                model.classify({
                    imageUrl: urlPic,
                })
                .then((predictions) => {
                    var marker = new Marker(fields);
                    // if(predictions[0].class == marker.trafficSignCode)
                    // {
                    //     console.log(marker);
                        return res.json(predictions);
                    // }
                    // else return res.json({
                    //     "message": "Something went wrong!"
                    // });
                })
                .catch((err) => {
                    res.json({
                        "message": "Something went wrong!"
                    });
                });
            }
        });
        
        // const url = "https://media-blog.sashido.io/content/images/2020/09/SashiDo_Dog.jpg";
        // marker.save()
        // .then((result) => {
        //     res.status(201).json(result);
        // })
        // .catch((ex) => {
        //     res.status(404).json({"message": "marker is not saved!"});
        // });
    },
    find: async (req, res) => {
        console.log("================");
        Marker.find().lean()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((ex) => {
            res.status(404).json({"message": "marker is not got!"});
        });
    }
}