const express = require('express');
const router = express.Router();

//User Model
const Schema = require('../../models/User')
const User = Schema.User;
const Resume = Schema.Resume;

//  @route    GET api/register
//  @desc     GET All Users
//  @access   Public
router.get('/', (req, res) => {
    User.find()
        .sort({ date: -1 })
        .then(users => res.json(users))
})

//  @route    POST api/register
//  @desc     Create A User
//  @access   Public
router.post('/', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save().then(user => res.status(200).json(user));
})

//  @route    DELETE api/register/:id
//  @desc     Delete An User
//  @access   Public
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
})

router.post('/login', (req, res) => {
    //form validation

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if(!user){
                return res.status(404).json({ success: false });
            }
            
            if(password !== user.password){
                return res.status(404).json({ success: false })
            }

            return res.status(200).json({ success: true, user})
        })

    
})

router.post('/create_resume', (req, res) => {
    const {
        template, 
        profile, 
        imageUrl, 
        name, 
        job, 
        email,
        phone, 
        address,
        summary,
        url,
        institution,
        study_program,
        study_city,
        study_country,
        startDate,
        endDate,
        presentDate,
        edu_achievement
    } = req.body;
    const newResume = new Resume({
        // resume: {
            template: template,
            // profile: profile,
            imageUrl: imageUrl,
            name: name,
            job: job,
            email: email,
            phone: phone,
            address: address,
            summary: summary,
            url: url,
            institution: institution,
            study_program: study_program,
            study_city: study_city,
            study_country: study_country,
            startDate: startDate,
            endDate: endDate,
            presentDate: presentDate,
            edu_achievement: edu_achievement
        // }
    })
    newResume.save().then(resume => res.status(200).json(resume));
})


module.exports = router;