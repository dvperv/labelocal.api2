const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
    idx: { type: String, required: true, index: true, unique: true }, // {high/low}-#folder-#file  ex.: "high-001-000000"
    bands: { type: Number, required: true },
    points: { type: Number, required: true },
    label: { type: String, required: true, enum: ['STAR', 'EMPTY', 'UNKNOWN', 'BLUEFIELD'] }
});

const SchemaFileMeta = mongoose.model('file-meta', noteSchema);

module.exports = SchemaFileMeta;
