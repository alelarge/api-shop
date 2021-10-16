const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');



module.exports = {
    signup: (req, res)=>{
        bcrypt.hash(req.body.password, 10, (err,hash)=>{
            if(err){
                return res.status(500).json({
                    status : 500,
                    message : err.message
                })
            }
            const newUser = new UserModel({
                email : req.body.email, 
                password : hash
            })
            newUser.save((err, user)=>{
                if(err){
                    return res.status(400).json({
                        status : 400,
                        message : err.message
                    })
                }
                return res.status(201).json({
                    status: 201,
                    message : 'User created!'
                })
            })
        })

    }
}