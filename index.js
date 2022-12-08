const express = require("express");
const conexionDB = require("./db/config");
const router = require("./routes/auth");
const task = require("./routes/tareas");
const cors = require('cors');
require('dotenv').config();

const app = express();
//conectar mongo
conexionDB()

//habilitando json
app.use(express.json())
//habilitando cors
app.use(cors());

app.use("/", express.static(__dirname + "/public"));
//Rutas
app.use('/auth', router)
app.use('/task', task)

port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Listening on port", port);
});
