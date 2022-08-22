const mongoose = require('mongoose');

// SETTING THE MULTER
const multer = require('multer');
const path = require('path');
const Add_PATH = path.join('/uploads/products/images');

const AddSchema = new mongoose.Schema({
    primaryText: {
        type: String,
        required: true
    },
    headline: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    cta: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    price: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

let storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
        // console.log(req.file);
      cb(null, path.join(__dirname ,'..',Add_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
});


// statics methods or functions using this i am connecting userSchema and multer storage
AddSchema.statics.uploadedAdds = multer({storage: storage}).fields([
    {name: "companyLogo", maxCount: 1}, 
    {name: "image", maxCount: 1}
]);

AddSchema.statics.addPath = Add_PATH ;



const ShowAdds = mongoose.model('ShowAdds',AddSchema);

module.exports = ShowAdds;