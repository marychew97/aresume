const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resumes: [{
        type: Schema.Types.ObjectId,
        ref: 'resume'
    }],
    date: {
        type: Date, 
        default: Date.now
    }
})

const ResumeSchema = new Schema({
    // username: {
    //     type:String,
    //     ref: 'user'
    // },
    type: Schema.Types.ObjectId,
    date: {
        type: Date,
        default: Date.now
    },
    template: {
        type: String
    }
    
})

module.exports = {
    User: mongoose.model('user', UserSchema),
    Resume: mongoose.model('resume', ResumeSchema)
}