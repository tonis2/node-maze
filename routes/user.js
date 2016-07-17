const DB = require("./db");

const createUser = (( req, res) => {
      let user = new DB.usersDB({
          username: req.params.username,
          password: req.params.password,
        });
      user.save((err, user) => {
        if (err) {
          res.json({ error:err });
        } else {
          res.json("Success!");
        }
    });
});

const users = (( username ) => {
  return new Promise((resolve, reject) => {
    DB.usersDB.findOne({ username:username })
      .exec((err, user) => {
          if(user) {
            resolve(user);
          } else if (err) {
            reject(err);
          } else {
            reject("no user found");
          }
      });
  });
});

const auth = (( req,res,next ) => {
  if(!req.headers.authorization) {
    res.json("No authorization");
  }
  let authHeader = req.headers.authorization.split(" ");
  let decode = Buffer.from(authHeader[1], 'base64').toString("ascii");
  let userData = decode.split(':');
  users(userData[0]).then( user => {
       if(user.password === userData[1]) {
          req.user = user;
          next();
       }
  }).catch(err => {
      res.json(err);
    });
});

module.exports = {
   createUser,
   auth
}
