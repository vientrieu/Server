const Marker = require('../model/Marker');
// const TrafficSign = require('../model/TrafficSign');
const fs = require('fs');
module.exports = {
    saveMarker: async (latitude, longitude, trafficSignCode, trafficSignName, trafficSignCategoryCode, goodVote, badVote) => {
        var marker = new Marker(
            {
                latitude: latitude || null,
                longitude: longitude || null,
                trafficSignCode: trafficSignCode,
                trafficSignName: trafficSignName,
                danger: trafficSignCategoryCode === 'BBNH' ? true : false,
                goodVote: goodVote,
                badVote: badVote
            }
        );
        marker.save()
            .catch((err) => { console.log('save error!'); })
            .then(() => {
                var result = [];
                result.push(predictions[0]);
                return result;
            });
    },
    deleteFile: async (path) => {
        if (path === null) return;
        try {
            fs.unlinkSync(path);
        }
        catch (err) {
            console.error(err);
        }
    }
}