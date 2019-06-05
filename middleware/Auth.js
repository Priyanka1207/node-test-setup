let jwt = require('jsonwebtoken');
var user = require('../models/user');


let check = (req, res, next) => {
  var token = req.headers['token'];
  /**
   * Check token exist
   */
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
 /**
   * Token verify
   */
  jwt.verify(token, process.env.SECRET_TOKEN, function (err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    user.findOne({
      where: {
        UserID: decoded.UserID
      }
    }).then(User => {
      if (!User) return res.status(404).send("No user found.");
      res.User = decoded;
      next();

    }).catch(err => {
      console.log('err', err);
    });
  });
}
module.exports = check;