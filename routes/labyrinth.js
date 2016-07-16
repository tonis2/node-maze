const DB = require("./db");
const solveMaze = require("./solveMaze").solveMaze;

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
    if(req.params.id) {
      data.forEach( item => {
        item.playfield.forEach( state => {
            if(state._id == req.params.id) {
              res.json(state.type);
            }
        });
      })
    } else {
      res.json(data);
    }
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
              let newData = data[0].playfield.filter( item => {
                if((Number(item.x) === Number(x)) && ((Number(item.y) === Number(y)))) {
                  return false;
                }
                return true;
              });
              data[0].playfield = newData;
              data[0].playfield.push({ x:x, y:y, type:type });
              data[0].save(err => {
                if(err) {
                  console.log(err)
                } else {
                  res.json("data updated");
                }
              });
        })
        .catch(err => {
          res.json(err);
        });
  } else if( url[3] === "start" ) {
      let x = req.params.x,
          y = req.params.y;
      labyrinths(null, id).then( data => {
          data[0].start = { x:x, y:y };
          data[0].save(err => {
            if(err) {
              console.log(err)
            } else {
              res.json("data updated");
            }
          })
      })
      .catch(err => {
        res.json(err);
      });
  } else if(url[3] === "end") {
      let x = req.params.x,
          y = req.params.y;
      labyrinths(null, id).then( data => {
          data[0].end = { x:x, y:y };
          data[0].save(err => {
            if(err) {
              console.log(err)
            } else {
              res.json("data updated");
            }
          })
      })
      .catch(err => {
        res.json(err);
      });
  }
});

const createLabyrinths = (( req, res) => {
      let data = new DB.labyrinthsDB({ owner: req.user._id });
      data.save( (err, data) => {
        if (err) {
          res.json({ error:err })
        } else {
          res.json(data._id);
        }
    });
});

const findSolution = ((req, res) => {
  const id = req.params.id;
  labyrinths(null, id).then( data => {
    solveMaze(data[0]).then( solution => {
      res.json(solution);
    })
  });
});

module.exports = {
   findLabyrinths,
   createLabyrinths,
   updateLabyrinths,
   findSolution
}
