const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async function (req, res) {
    function isEmpty(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }
        return JSON.stringify(obj) === JSON.stringify({});
    }

    if (isEmpty(req.body)) {
        res.status(400).json({
            success: false,
            message: "Please fill all fields",
            data: {}
        })
    }
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
                message: "Login Succcessfully",
                token: token,
                user: {
                    id: candidate._id,
                    firstName: candidate.firstName,
                    email: candidate.email,
                    phone: candidate.phone,
                    gender: candidate.gender,
                    state: candidate.state,
                    city: candidate.city,
                    zip_code: candidate.zip_code,
                    sale_number: candidate.sale_number,
                    register_type: candidate.register_type,
                    imageSrc: candidate.imageSrc
                }
            })
        } else {
            res.status(401).json({
                message: 'The passwords are matching'
            })
        }
    } else {
        res.status(400).json({
            // message: 'Senc uzer arden ka',
            success: false,
            message: "Please fill all fields",
            data: {}
        })
    }
};

module.exports.register = async function (req, res) {
    function isEmpty(obj) {
        for (var prop in obj) {
            // if (obj.hasOwnProperty(prop))
            //     return false;
        }
        return JSON.stringify(obj) === JSON.stringify({});
    }

    if (isEmpty(req.body) || req.body.email ==null || req.body.password==null){
        res.status(400).json({
            success: false,
            message: "Please fill all fields",
            data: {}
        })
    }
    console.log(req.body);
    const candidate = await User.findOne({email: req.body.email});
    if (candidate) {
        // ete ka uzer , petq sxal shprtem
        res.status(409).json({
            success: false,
            message: 'Users Exists',
            data: {}
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
            imageSrc: req.file ? req.file.path : ' ',
            password: bcrypt.hashSync(password, salt)
        });
        try {
            await user.save();
            res.status(201).json({
                success: true,
                message: "Registration Successfully",
                data: {
                    id: user.id,
                    firstName: user.firstName,
                    email: user.email,
                    phone: user.phone,
                    gender: user.gender,
                    state: user.state,
                    city: user.city,
                    zip_code: user.zip_code,
                    sale_number: user.sale_number,
                    register_type: user.register_type,
                    avatar:user.imageSrc,

                },
            })
        } catch (e) {
            res.status(400).json({
                success: false,
                message: 'Please fill all fields',
                data: {}
            })
            // errorHandler(res, e)
        }
    }
};
