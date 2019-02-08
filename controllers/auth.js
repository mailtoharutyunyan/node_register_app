const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email});
    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            //generating token passwordn okeya hetevyal filderov
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60});//mi jam 60rope * 60varkyan
            res.status(200).json({
                success: true,
                "message": "Login Succcessfully",
                token: `Bearer ${token}`,
                user: candidate
            })
        } else {
            res.status(401).json({
                message: 'passwordnern irar het chen brnel, pordzeq krkin'
            })
        }
    } else {
        res.status(400).json({
            message: 'Senc uzer arden ka'
        })
    }

};

module.exports.register = async function (req, res) {
    //email , password
    const candidate = await User.findOne({email: req.body.email});
    if (candidate) {
        // ete ka uzer , petq sxal shprtem
        res.status(409).json({
            message: 'Senc mail arden granvaca , pordzeq urish'
        })
    } else {
        // petqa user sarqem
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            gender: req.body.gender,
            dob: req.body.dob,
            state: req.body.state,
            city: req.body.city,
            zip_code: req.body.zip_code,
            sale_number: req.body.sale_number,
            register_type: req.body.register_type,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });
        try {
            await user.save();
            res.status(201).json({
                success: true,
                message: "Registration Successfully",
                user: user,

            })
        } catch (e) {
            errorHandler(res, e)
        }
    }
};
