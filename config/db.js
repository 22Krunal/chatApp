const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/chat_App3_O"
const connect = () => {
  mongoose.connect(url,{
    useNewUrlParser : true,
    useUnifiedTopology : true
  })
  .then(()=>{
    console.log("Connected to Database Successfully");
  })
  .catch((error)=>{
    console.log("Error Occured during database connection ",error);
  });
};

module.exports = connect;
