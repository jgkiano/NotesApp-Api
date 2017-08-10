const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;

//so mongoose can stop throwing that warning
mongoose.Promise = global.Promise;

const notesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});
const Notes = mongoose.model('Notes', notesSchema);
module.exports = Notes;
