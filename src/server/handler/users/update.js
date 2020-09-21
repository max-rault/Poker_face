const mongoose = require('mongoose');
const User = require('../../../model/user');

async function UpdateUser(data, id){
  mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useUnifiedTopology: true, poolSize: 20 ,useNewUrlParser: true})
  .then(() => console.log("i'm connected"))
  .catch((err) => console.error("db connection  err: ", err))

	let doc;
  
  doc = await User.newUser().findOneAndUpdate({_id: id},{$set:{
    firstname: data.firstname,
    lastname: data.lastname,
    gender: data.gender,
    mail: data.mail,
    userName: data.userName,
    pwd: data.pwd,
    type: data.type,
  }}, {new: true}, (err, doc) =>{
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

module.exports = {"UpdateUser": UpdateUser}