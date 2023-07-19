const mongoose = require('mongoose');



const jobSchema = new mongoose.Schema({

    heading: String,


    storyLogoURL: String,

    description: String,
    

    categary: String,

  

})

module.exports = mongoose.model('Job', jobSchema);

