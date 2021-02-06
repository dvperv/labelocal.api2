const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaFileMeta = new Schema({
    _id: { type: String, required: true, index: true, unique: true },
    // {high/low}-#folder-#file  ex.: "high-001-000000"
    // bands: { type: Number, required: true },
    // points: { type: Number, required: true },
    label: { type: String, required: true, enum: ['Y', 'N', 'U'] }
});

const modelFileMeta = mongoose.model('meta', schemaFileMeta);

module.exports = modelFileMeta;
