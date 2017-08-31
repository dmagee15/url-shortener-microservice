'use strict';

var fs = require('fs');
var express = require('express');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var smallurl = require('./smallurl');
var app = express();
var index;

mongoose.connect('mongodb://'+process.env.SECRET+'@ds161483.mlab.com:61483/shorturls');

app.use('/public', express.static(process.cwd() + '/public'));
  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })

app.get('/api/:data(*)', function(req,res){
  var input = req.params.data;
  var regex = /^(^((http|https):\/\/)?(www.)?)?[\w-.]*((.com)|(.net)|(.org))\/?[\w-\/.]*/
  var result = 0;
  
  if(regex.test(input)){
    
    smallurl.findOne({address:input}, function(err, data){
      if(err)throw err;
      if(data){
        result = {
            "url": data.address,
            "shorturl": data.code
            };

            res.json(result);
      }
      else{
        smallurl.find(function(err, data){
          if(err)throw err;
          
          index = data.length+1; 
          var record = new smallurl({address: input,code: index});
          record.save();       
            
          result = {
            "url": input,
            "shorturl": index
            };
          res.json(result);
        
          
        })
      }
      
    });
  }
  
});

app.get('/:num', function(req,res){
  var input = req.params.num;

  var regexNum = /^[0-9]*$/;
  if(regexNum.test(input)){
    smallurl.findOne({code:input},function(err,data){
      if(err)throw err;
      
      var result;
      var regexAddress = /(http|https):\/\//;
      
      if(!regexAddress.test(result)){
        res.redirect("http://"+data.address);
      }
      else{
        res.redirect(data.address);
      }
    });
  }
  
});

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});

