const mongoose = require("mongoose");
// const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const trafficSignSchema = new Schema(
    {
        code: {
            type: String,
            length: 5
        },
        categoryCode: {
            type: String,
            length: 5
        },
        name: {
            type: String,
            length: 256
        },
        image: {
            type: String,
            length: 256
        },
        description: {
            type: String,
            length: 256
        }
    },
    {
        timestamps: true,
    }
);
// pointSchema.plugin(mongoosePaginate);
const TrafficSign = mongoose.model("trafficSigns", trafficSignSchema);
module.exports = TrafficSign;