const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaFileMeta = new Schema({
    _id: String, // {H/L}-#folder-#file  ex.: "H-001-000000"
    label: { type: String, required: true, enum: ['Y', 'N', 'U'] }
});

const modelFileMeta = mongoose.model('meta', schemaFileMeta);

module.exports = modelFileMeta;
