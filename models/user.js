const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;

//so mongoose can stop throwing that warning
mongoose.Promise = global.Promise;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    notes: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Notes' }]
});
const User = mongoose.model('User', userSchema);
module.exports = User;
