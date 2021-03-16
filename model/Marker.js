const mongoose = require("mongoose");
// const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const markerSchema = new Schema(
    {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
        markerCode: {
            type: String,
            length: 5
        },
        content: {
            type: String,
            length: 255
        }
    },
    {
        timestamps: true,
    }
);
// pointSchema.plugin(mongoosePaginate);
const Marker = mongoose.model("markers", markerSchema);
module.exports = Marker;