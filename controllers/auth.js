var express = require('express');
var db = require('../db/db');
var router = express.Router();




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
