var express = require('express');
var db = require('../db/db');
var router = express.Router();
var nodemailer = require('nodemailer');





exports.login = function(req,res) {
    console.log("in login");
    console.log("body: ",req.body);
    var connection = db.getDbConnection();
    var queryStatement = "select ID from admins where email='"+req.body.email+"' ";
	connection.query(queryStatement,function(err,result){
		if(err) {
			console.log("error: ",err);
            res.status(400).send(err);
           
            		
		} else {
           // console.log("success: ",result);
            if(result.length>0){
                var queryStatement = "select ID from admins where email='"+req.body.email+"' and password='"+req.body.password+"'";
                connection.query(queryStatement,function(err,result){
                    if(err) {
                        console.log("error: ",err);
                        res.status(400).send(err);
                       
                                
                    } else {
                       // console.log("success: ",result);
                        if(result.length>0){
                            res.status(200).send(" successfully login ");
                            console.log("hii login successfull");
                        } else {
                            res.status(401).send("password is wrong");
                            console.log("password is wrong");
                        }
                // res.status(200).send(" successfully login result");
                // console.log("hii login successfull");
            } 
        });
        }else {
                res.status(401).send("Email id is not valid");
                console.log("Email id is not valid");
            }
			
        
	
    }
});
}


exports.nodemailer = function(req,res)
{
    console.log("body: ",req.body);

    
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: req.body.email1, 
        pass: req.body.password
      }
    });
    
    var mailOptions = {
      from: req.body.email1,
      to: req.body.email2,
      subject: req.body.subject,
      text: req.body.text
      
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.status(400).send(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send("Email is send ");
      }
    });
}
