const mongoose = require("mongoose");
// const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const pointSchema = new Schema(
    {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
        attention: String,
        pictureURL: String,
    },
    {
        timestamps: true,
    }
);
// pointSchema.plugin(mongoosePaginate);
const Point = mongoose.model("Points", pointSchema);
module.exports = Point;