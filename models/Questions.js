const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({


    createdByUser: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'category',
        required: true,
    },
    questionType: {
        type: mongoose.Schema.ObjectId,
        ref: 'questionType',
        required: true
    },
    questionMessage: {
        type: String,
        required: true
    },
    questionFile: {
        type: String,
        required: false,
        default: ''
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('questions', questionSchema);