const mongoose = require('mongoose');
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
const Category = mongoose.model('categories', categorySchema);
module.exports = Category;