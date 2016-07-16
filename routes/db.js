const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1/labrythn');
let Schema = mongoose.Schema

let labyrinths = new Schema({
  owner: { type: String, required: true },
  start: [{ x: { type: Number }, y: { type: Number } }],
  end: [{ x: { type: Number }, y: { type: Number } }],
  playfield: [{ x: { type: Number, default: 0 },
                y: { type: Number, default: 0 },
                type: { type: String, enum: ['empty', 'blocked'] }
             }]
});

let Users = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

const usersDB =  mongoose.model('users', Users);
const labyrinthsDB =  mongoose.model('labyrinth', labyrinths);

module.exports = {
   usersDB,
   labyrinthsDB
}
