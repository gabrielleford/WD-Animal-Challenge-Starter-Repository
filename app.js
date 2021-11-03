require('dotenv').config();
const express = require("express");
const db = require("./db");
const middleware = require("./middleware");
const app = express();



const controllers = require("./controllers");

app.use(express.json());

app.use("/user", controllers.usercontroller);
app.use(middleware.validateSession);
app.use("/animal", controllers.animalcontroller);

db.authenticate()
  .then(() => db.sync()) // => {force: true}
  .then(() => {
    app.listen(3000, () =>
      console.log(`[Server: ] App is listening on Port ${3000}`)
    );
  })
  .catch((err) => {
    console.log("[Server: ] Server Crashed");
    console.error(err);
  });
