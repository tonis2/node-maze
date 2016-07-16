const express = require("express");
const app = express();
const auth = require("./routes/user").auth;
const createUser = require("./routes/user").createUser;
const createLab = require("./routes/labyrinth").createLabyrinths;
const findLab = require("./routes/labyrinth").findLabyrinths;
const updateLab = require("./routes/labyrinth").updateLabyrinths;

app.post("/users/:username/:password", createUser);


app.all('/labyrinth', auth);
app.get("/labyrinth", findLab);
app.post("/labyrinth", createLab);
app.get("/labyrinth/:id", updateLab);
app.get("/labyrinth/:id/solution", createUser);
app.post("/labyrinth/:id/playfield/:x/:y/:type", updateLab);
app.post("/labyrinth/:id/start/:x/:y", updateLab);
app.post("/labyrinth/:id/end/:x/:y", updateLab);

app.listen(8080, "127.0.0.1", (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port 8080. Api adress 127.0.0.1:8080.`)
  }
})
