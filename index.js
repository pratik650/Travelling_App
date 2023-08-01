const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnectt = require("./database/dbConnect.js");
const userRoutes = require("./src/api/routes/userRoutes.js");
const postRoutes = require("./src/api/routes/postRoutes.js");

dotenv.config();

dbConnectt();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, "frontend", "build")));
// app.get("/" , (req,res) => {
//     res.send("working");
// });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  })

app.use("/api/v1/", userRoutes);
app.use("/api/v1/post" , postRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/build', 'index.html'));
  });

app.listen(process.env.PORT, () =>{
    console.log(`server is running at port ${process.env.PORT}`);
})


