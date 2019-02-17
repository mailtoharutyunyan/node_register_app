const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    questionType: {
        type: String,
        required: true
    }

});


module.exports = mongoose.model('questionType', questionSchema);