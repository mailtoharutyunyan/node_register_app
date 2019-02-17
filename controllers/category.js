const User = require('../models/User');
const Category = require('../models/Category');


module.exports.addCategory = async function (req, res) {
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

    const categorymodel = new Category({
        categoryName:req.body.categoryName,
    });
    try {
        await categorymodel.save();
        res.status(201).json({
            success:true,
            message:"created",
            data:categorymodel,
        })
    }catch (e) {
        res.status(400).json({
            success:false,
            data:{},
        })
    }




};