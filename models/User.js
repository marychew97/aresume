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
    resumeName: {
        type: String,
        required: true
    },
    template: {
        type: String
    },
    templateImg:{
        type: String
    }, 
    // profile: {
    //     type: Buffer
    // },
    imageUrl: {
        type: String
    },
    name: {
        type: String
    },
    job: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    summary: {
        type: String
    },
    url: {
        type: String
    },
    institution: {
        type: String
    },
    study_program: {
        type: String
    },
    study_city: {
        type: String
    },
    study_country: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    presentDate: {
        type: Boolean
    },
    edu_achievement: {
        type: String
    }
})

module.exports = {
    User: mongoose.model('user', UserSchema),
    Resume: mongoose.model('resume', ResumeSchema)
}