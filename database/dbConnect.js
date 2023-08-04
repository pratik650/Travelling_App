const mongoose = require("mongoose");


const dbConnectt = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => {
        console.log("connection succesfull");
    })
    .catch((err) => {
        console.log(err);
    })
}

module.exports = dbConnectt;
