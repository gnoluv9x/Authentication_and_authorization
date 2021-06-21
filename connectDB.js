const mongoose = require('mongoose');

// connect DB
mongoose.connect('mongodb+srv://vulong:vulongpt90@cluster0.utibo.mongodb.net/First_Project?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
},
(err) =>{
    if(err){
        console.log(err);
    }else{
        console.log('Connected');
    }
}
);

module.exports = mongoose;