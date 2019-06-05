const user = require('../models/user');
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
const helper = require('../helper/sendMail');

/**
 * Api to create user
 */
exports.addUser = function (req, res) {

    if (req.body.Name == "") {
        res.send({
            meta: {
                "status": false,
                "code": 400,
                "msg": "Name is required"
            }
        });
    }
    if (req.body.Password == "") {
        res.send({
            meta: {
                "status": false,
                "code": 400,
                "msg": "Password is required"
            }
        });
    }
    if (req.body.Email == "") {
        res.send({
            meta: {
                "status": false,
                "code": 400,
                "msg": "Email is required"
            }
        })
    }

    var hashedPassword = bcrypt.hashSync(req.body.Password, 8);
    user.create({
        Name: req.body.Name,
        Email: req.body.Email,
        Password: hashedPassword,
        Mobile: req.body.Mobile,
        Address: req.body.Address
    }).then(result => {
        /**
         * Created JWT token
         */
        var token = jwt.sign({ UserID: result.UserID }, process.env.SECRET_TOKEN, {
            expiresIn: 86400 // expires in 24 hours
        });
        var mailAssignToOptions = {
            from: 'test@gmail.com', // sender address
            to: req.body.Email, // list of receivers
            subject: 'Account verification', // Subject line
        };
        helper.sendMail(mailAssignToOptions);
        res.send({
            data: result,
            token: token,
            meta: {
                "status": true,
                "code": 200,
                "msg": "Record has been added!"
            }
        });
    }).catch(err => {
        res.send({
            meta: {
                "status": false,
                "code": 500,
                "msg": "something went wrong"
            }
        });
    });
}
/**
 * Api to login user
 */
exports.login = function (req, res) {
    user.findOne({
        where: {
            Email: req.body.Email
        }
    }).then(UserData => {
        var passwordIsValid = bcrypt.compareSync(req.body.Password, UserData.Password);
        if (!passwordIsValid) {
            res.send({
                status: false,
                code: 400,
                msg: "Password incorrect"

            })
        }

        /**
        * Created JWT token
        */
        var token = jwt.sign({ UserID: UserData.UserID }, process.env.SECRET_TOKEN, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.send({
            Data: UserData,
            token: token,
            meta: {
                "status": true,
                "code": 200,
                "msg": "Login Successfull"
            }
        });

    }).catch(err => {
        res.send({
            meta: {
                "status": false,
                "code": 500,
                "msg": "something went wrong"
            }
        });
    })
}

/**
 * Api to get logged in user details/Profile
 */
exports.getProfile = function (req, res) {
    console.log('res.User.UserID', res.User.UserID);
    user.findOne({
        where: {
            UserID: res.User.UserID
        },
        include: [{
            model: Address
        }]
    }).then(result => {
        res.send({
            Data: result,
            meta: {
                "status": true,
                "code": 200,
                "msg": "User Profile"
            }
        });

    }).catch(err => {
        res.send({
            meta: {
                "status": false,
                "code": 500,
                "msg": "something went wrong"
            }
        });

    })
}

/**
 * Api to update user
 */
exports.updateUser = function (req, res) {

    if (req.body.Name == "") {
        res.send({
            meta: {
                "status": false,
                "code": 400,
                "msg": "Name is required"
            }
        });
    }
    
    if (req.body.Email == "") {
        res.send({
            meta: {
                "status": false,
                "code": 400,
                "msg": "Email is required"
            }
        })
    }

    user.findOne({
        where: {
            UserID: res.User.UserID
        }
    }).then(result => {
        if (!result) {
            res.send({
                meta: {
                    "status": false,
                    "code": 404,
                    "msg": "No User Found"
                }
            });
        }
        user.update(req.body ,{
            where: {
                UserID: res.User.UserID
            }
        }).then(result => {
            res.send({
                meta: {
                    "status": true,
                    "code": 200,
                    "msg": "User Updated successfully"
                }
            });
        }).catch(err => {
            res.send({
                meta: {
                    "status": false,
                    "code": 500,
                    "msg": "something went wrong"
                }
            });
        });
    }).catch(err => {
        res.send({
            meta: {
                "status": false,
                "code": 500,
                "msg": "something went wrong"
            }
        });
    });
}

/**
 * Api to delete user
 */
exports.deleteUser = function (req, res) {

    if (req.body.UserID == "") {
        res.send({
            meta: {
                "status": false,
                "code": 400,
                "msg": "UserID is required"
            }
        });
    }
    user.destroy({
        where: {
            UserID: req.body.UserID
        }
    }).then(result => {

        if (result == null) {
            res.send({
                meta: {
                    "status": false,
                    "code": 404,
                    "msg": "No user found"
                }
            });
        }
        res.send({
            meta: {
                "status": true,
                "code": 200,
                "msg": "User Deleted"
            }
        });
    })
}
