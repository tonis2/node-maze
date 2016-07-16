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
          if(user)
            resolve(user);
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
    if(user) {
       if(user.password === userData[1]) {
          req.user = user;
          next();
       } else {
         res.json("Authorization data wrong");
       }
    } else {
         res.json("Authorization data wrong");
    }
  });
});

module.exports = {
   createUser,
   auth
}
