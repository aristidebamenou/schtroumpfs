const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SchtrompfSchema = new Schema({
    name: { type: String, required: [true, 'Le nom est requis'] },
    family: { type: String },
    race: { type: String },
    foods: [{ type: String }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'schtrompf'
    }]
});

const Schtrompf = mongoose.model('schtrompf', SchtrompfSchema);

module.exports = Schtrompf;