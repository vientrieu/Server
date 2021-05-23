var Category = require('../model/Category');
var Marker = require('../model/Marker');
var TrafficSign = require('../model/TrafficSign');
module.exports = {
    genCategory: async (req, res) => {
        for (let i = 0; i < 5; i++) {
            var category = new Category(
                {
                    code: i,
                    name: 'Biển báo ' + i,
                    description: 'Loại biển báo này giúp ' + i
                }
            );
            category.save()
                .catch((err) => {
                    console.log(err);
                })
                .then((result) => {
                    console.log(result);
                })
        }
    },
    genMarker: async (req, res) => {
        for (let i = 0; i < 5; i++) {
            var marker = new Marker(
                {
                    latitude: i,
                    longitude: i,
                    markerCode: i
                }
            );
            marker.save()
                .catch((err) => {
                    console.log(err);
                })
                .then((result) => {
                    console.log(result);
                })
        }
    },
    genTrifficSign: async (req, res) => {
        for (let i = 0; i < 5; i++) {
            var trafficSign = new TrafficSign(
                {
                    code: i,
                    categoryCode: i,
                    name: 'Biển báo ' + i,
                    image: 'url-image-' + i,
                    description: 'Loại biển báo này giúp ' + i
                }
            );
            trafficSign.save()
                .catch((err) => {
                    console.log(err);
                })
                .then((result) => {
                    console.log(result);
                })
        }
    }
}