const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
const markerSchema = new Schema(
    {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
        trafficSignCode: {
            type: String,
            length: 5
        },
        trafficSignName: {
            type: String,
            length: 256
        },
        danger: {
            type: Boolean,
        },
        goodVote: {
            type: Number,
        },
        badVote: {
            type: Number,
        }
    },
    {
        timestamps: true,
    }
);
markerSchema.plugin(autoIncrement.plugin, 'markers');
const Marker = mongoose.model('markers', markerSchema);
module.exports = Marker;