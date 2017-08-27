'use strict';

var fs = require('fs');
var express = require('express');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var smallurl = require('./smallurl');
var app = express();
var index;

mongoose.connect('mongodb://test:test@ds161483.mlab.com:61483/shorturls');

app.use('/public', express.static(process.cwd() + '/public'));
  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })

app.get('/:data(*)', function(req,res){
  var input = req.params.data;
  var regex = /^(^((http|https):\/\/)?(www.)?)?[\w-.]*((.com)|(.net)|(.org))\/?[\w-\/.]*/
  var result = 0;
  
  if(regex.test(input)){
    
    console.log("Valid Url: "+input);
    
    smallurl.findOne({address:input}, function(err, data){
      if(err)throw err;
      
      if(data){
        result = {
            "url": data.address,
            "shorturl": data.code
            };
            console.log(data);
            console.log(data.address+" "+data.code);
            res.json(result);
      }
      else{
        
        console.log("Not found in database");
        
        smallurl.find(function(err, data){
          if(err)throw err;
          index = data.length+1;
          console.log("index: "+index);
          
          var record = new smallurl({address: input,code: index});
        
          record.save(function(err){
          if(err)throw err;
          console.log("New url saved successfully");
          console.log(record);
          console.log("Index: "+index);
            
            result = {
            "url": input,
            "shorturl": index
            };
            
            res.json(result);
          });
        
          
        })
        
      }
      
    });
    
  }
  
});

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});

