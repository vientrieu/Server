const mongoose = require("mongoose");
// const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const categorySchema = new Schema(
    {
        code: {
            type: String,
            length: 5
        },
        name: {
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
const Category = mongoose.model("categories", categorySchema);
module.exports = Category;