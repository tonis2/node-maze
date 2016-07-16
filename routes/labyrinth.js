const DB = require("./db");

function filterData(item) {
    if((Number(item.x) === Number(x)) && ((Number(item.y) === Number(y)))) {
      return false;
    }
    return true;
}

const labyrinths = ( userid, labyrinth ) => {
      return new Promise((resolve, reject ) => {
        if(userid) {
          DB.labyrinthsDB.find({ owner: userid })
          .exec((err, data) => {
              if(data) {
                resolve(data);
              } else if (err) {
                reject(err);
              }
          });
        } else if(labyrinth) {
          DB.labyrinthsDB.find({ _id: labyrinth })
          .exec((err, data) => {
              if(data) {
                resolve(data);
              } else if (err) {
                reject(err);
              }
          });
        }
      });
};

const findLabyrinths = ((req, res) => {
  let user = req.user._id;
  labyrinths(user).then( data => {
    res.json(data);
  })
});

const updateLabyrinths = ((req, res) => {
  let url = req.originalUrl.split("/");
  const id = req.params.id;
  if(url[3] === "playfield") {
        let x = req.params.x,
            y = req.params.y;
            type = req.params.type;
        labyrinths(null, id).then( data => {
              let newData = data[0].playfield.filter(filterData);
              data[0].playfield = newData;
              data[0].playfield.push({ x:x, y:y, type:type });
              data[0].save(err => console.log(err));
        })
        .catch(err => {
          res.json(err);
        });
  } else if( url[3] === "start" ) {
      let x = req.params.x,
          y = req.params.y;
      labyrinths(null, id).then( data => {
          data[0].start = { x:x, y:y };
          data[0].save(err => console.log(err))
      })
      .catch(err => {
        res.json(err);
      });
  } else if(url[3] === "end") {
      let x = req.params.x,
          y = req.params.y;
      labyrinths(null, id).then( data => {
          data[0].end = { x:x, y:y };
          data[0].save(err => console.log(err))
      })
      .catch(err => {
        res.json(err);
      });
  }
});

const createLabyrinths = (( req, res) => {
      let data = new DB.labyrinthsDB({ owner: req.user._id });
      data.save( err => {
        if (err) {
          res.json({ error:err })
        } else {
          res.json("Success");
        }
    });
});


module.exports = {
   findLabyrinths,
   createLabyrinths,
   updateLabyrinths
}
