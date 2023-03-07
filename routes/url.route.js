const express=require('express');
const router=express.Router();
const uuid=require('short-uuid');
const Url=require('../models/url.model');
require('dotenv').config();

router.post('/',async(req,res)=>{
    const origUrl=req.query.id;
    const base = process.env.BASE;
    const urlId=uuid.generate();
    if(!origUrl){
        res.status(400).json({message:"Url field cannot be empty"});
    }
    try {
        let url= await Url.findOne({origUrl});
        if(url){
            res.json({url});
        }else{
            const shortUrl=`${base}/${urlId}`;
            url= new Url({
                origUrl,
                shortUrl,
                urlId,
                date: new Date(),
            });
            await url.save();
            res.json(url);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Server Error');
    }
})

router.get('/:urlId', async (req, res) => {
    try {
      const url = await Url.findOne({ urlId: req.params.urlId });
      if (url) {
        return res.redirect(url.origUrl);
      }
       else res.status(404).json('Not found');
    } catch (err) {
        
      console.log(err);
      res.status(500).json('Server Error');
    }
  });
module.exports= router;