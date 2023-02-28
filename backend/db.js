const mongoose = require('mongoose');

// const mongoURI = "mongodb+srv://Akshita:ozl5rekeiVnFgKOE@cluster0.fhvvat5.mongodb.net/gofoodmern?retryWrites=true&w=majority"
const mongoURI = "mongodb://Akshita:ozl5rekeiVnFgKOE@ac-iyqgyyn-shard-00-00.fhvvat5.mongodb.net:27017,ac-iyqgyyn-shard-00-01.fhvvat5.mongodb.net:27017,ac-iyqgyyn-shard-00-02.fhvvat5.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-ebuat1-shard-0&authSource=admin&retryWrites=true&w=majority"
mongoose.set("strictQuery", false);

const mongoDB = async () => {
  await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    if (err) console.log("---", err)
    else {
      console.log("Connected");
      const fetched_data = await mongoose.connection.db.collection("food_items");
      fetched_data.find({}).toArray(async function (err, data) {
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        foodCategory.find({}).toArray(function (err, catData){
          if (err) console.log(err);
          else {
            global.food_items = data;
            global.foodCategory = catData
          }
        })
        // if(err) console.log(err);
        // else {
        //   global.food_item = data;
        // console.log(global.food_item)
        // }

        //console.log(); //yaha par data extract kar sakte by consoling data
        //Reading of data happens here
      })
    }
  });
}

module.exports = mongoDB;