const mongoose = require('mongoose');
const table = require('../../../model/table');

async function DeleteTable(id){
  mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useUnifiedTopology: true, poolSize: 20 ,useNewUrlParser: true})
  .then(() => console.log("i'm connected"))
  .catch((err) => console.error("db connection  err: ", err))

	let doc;
  
  doc = await table.newTable().findOneAndDelete({_id: id}, (err, doc) =>{
    if(err){
      console.log("Something wrong when updating data!");
    }

    console.log(doc);
  })
  doc.save()

  mongoose.disconnect()
  .then(()=>{"im disconnected"})
  .catch((err) => console.log("err : ", err))
}

module.exports = {"DeleteTable": DeleteTable}