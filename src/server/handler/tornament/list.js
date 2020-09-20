const mongoose = require('mongoose');
const Tornament = require('../../../model/tornament')

async function ListTornament(){
   mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useNewUrlParser: true})
   .then(() => console.log("im conected"))
   .catch((err) => console.log("error : ", err))
   var res = await Tornament.newTornament().find({})

   await res.forEach(element => {
      var realStartDate = new Date(element.startdate)
      var realEndDate = new Date(element.enddate)
      
      element.enddate = realEndDate.toLocaleString()
      element.startdate = realStartDate.toLocaleString()
   });
   mongoose.disconnect()
   return res
}

module.exports = {"ListTornament": ListTornament}
