const Add = require('../models/AddModel');
const Company = require('../models/companyModel');

module.exports.createAdds = async function(req,res) {
    try{
        let adds;
        let company;
        
        Add.uploadedAdds(req,res, async function(err){
            // console.log(req.body);
            // console.log(req.files.companyLogo[0].filename);
            // console.log(req.files.image[0].filename);
            if(err){
                console.log('***Multer Error:',err);
            }

            company = await Company.create({
                companyName: req.body.companyName,
                url: req.body.companyUrl
            });
            if(req.files.companyLogo){
                company.companyLogo = Add.addPath + '/' + req.files.companyLogo[0].filename;
            }
            company.save();
            console.log(company._id);

            adds = await Add.create({
                primaryText: req.body.primaryText,
                headline: req.body.headline,
                description: req.body.description,
                company_id: req.body.company_id,
                cta: req.body.cta,
                price: req.body.price,
                company_id: company._id
            });

            if(req.files.image){
                adds.image = Add.addPath + '/' + req.files.image[0].filename;
            }

            adds.save();
            console.log(adds);
            
         
            res.json({adds: adds});
            
        });
    }catch(err){
        console.log(err.message);
        res.json(err); 
    }
}


module.exports.fetchAdds = async function(req,res){
   try{
        let adds = await Add.find({}).populate('company_id')
        res.json(adds)

    }catch(err){
        console.log(err.message);
        res.json(err); 
    }
}

module.exports.searchAdds = async function(req,res){
    try{
        console.log(req.query)
        if(req.query.search.length > 1){
            console.log('hello')
            const regex = new RegExp(escapeRegex(req.query.search),'gi');
            let adds = await Add.find({headline: {$regex: regex}}).populate('company_id')
            res.json(adds)

        }else{
            let adds = await Add.find({}).populate('company_id')
            res.json(adds)
        }
        
            
    }catch(err){
        console.log(err.message);
        res.json(err);  
    }
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};