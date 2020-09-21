const mongoose = require('mongoose');
const Tornament = require('../../../model/tornament')

async function ListTornament(){
  try {
    await mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {
      useUnifiedTopology: true, 
      poolSize: 20 ,
      useNewUrlParser: true
    })
  
    var res = await Tornament.newTornament().find({})
    res.forEach(element => {
      let realStartDate = new Date(element.startdate)
      let realEnddate = new Date(element.enddate)

      element.startdate = realStartDate.toLocaleString()
      element.enddate = realEnddate.toLocaleString()
    });
    await mongoose.disconnect()
    return res
  } catch (error) {
    console.log(error)
  }
}

module.exports = {"ListTornament": ListTornament}
