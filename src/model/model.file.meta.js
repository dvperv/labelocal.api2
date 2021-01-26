const mongoose = require('mongoose');
const { Schema } = mongoose;

const modelFileMeta = new Schema({
    idx: { type: String, required: true, index: true, unique: true }, // {high/low}-#folder-#file  ex.: "high-001-000000"
    bands: { type: Number, required: true },
    points: { type: Number, required: true },
    label: { type: String, required: true, enum: ['STAR', 'EMPTY', 'UNKNOWN', 'BLUEFIELD'] }
});

const modelFileMeta = mongoose.model('meta', modelFileMeta);

module.exports = modelFileMeta;
