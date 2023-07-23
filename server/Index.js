const connectToMongo = require("./Db");
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Food = new Schema({
    
    Name :{
        type : String,
        required : true
    }
})

Foodies = mongoose.model('Foodies',Food);

connectToMongo();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post("/add", async (req, res) => {
  const F = await Foodies.create(req.body);
  const Food_name = await Foodies.aggregate([{ $group: { _id: "$Name", count: { $sum: 1 } } }, { $sort: { _id: 1 } }]);
  // Format the result
  const formattedResult = [["Foodies", "foodies_count"]];
  Food_name.forEach(({ _id, count }) => {
    formattedResult.push([String(_id), count]);
  });
  res.send(formattedResult );
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
