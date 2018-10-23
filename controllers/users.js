var express = require('express');
var db = require('../db/db');
var router = express.Router();
var url = require('url');
// var url_parts = url.parse(request.url, true);
// var query = url_parts.query;

function validateEmail(email) {
    // First check if any value was actually set
    if (email.length == 0) return false;
    // Now validate the email format using Regex
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    return re.test(email);
}
function phonenumber(mobile) {
    var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if(inputtxt.value.match(phoneno)) {
      return true;
    }  
    else {  
      alert("message");
      return false;
    }
  }
  function validatePhone(mobile) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneno.test(mobile)
  }

// create users
exports.createUser = function(req, res) {
    
    console.log("entering into createUsers");
    
    // print inputs
    console.log("request body: ", req.body);

    dbConnection = db.getDbConnection();
   
    if(req.body.last_name===undefined )
    {
        req.body.last_name='';
    }
    if(req.body.address===undefined )
    {
        req.body.address='';
    }
    if(req.body.mobile===undefined )
    {
        req.body.mobile= null;
    }


    
  
var first_name= req.body.first_name;
var last_name = req.body.last_name;
var password = req.body.password;
var mobile=req.body.mobile;
var address = req.body.address;
var email = req.body.email;
if (!validateEmail(email)) { console.log('Invalid email address');
res.status(204).send("invalid email address");
}
else if(first_name.length<3 || first_name.length>32)
{
    console.log("invalid first_name");
    res.status(204).send("invalid first_name");

}
else if(last_name.length!=0 && (last_name.length<3 || last_name.length>32))
  
        {
        console.log("invalid last_name");
        res.status(204).send("invalid last_name");
         }

 else if(password.length<8 || password.length>32)
  
         {
         console.log("invalid password");
         res.status(204).send("invalid password");
          }

else if(address.length!=0 && address.length>500)
  
        {
        console.log("invalid address");
        res.status(204).send("invalid address");
         }
         
// else if(mobile!=null )
  
//         {
//         console.log("invalid mobile");
//         res.status(204).send("invalid mobile");
//          }
    
else if(mobile!=null && mobile<6000000000  || mobile> 10000000000 )
{
    console.log("mobile number is not valid")
    res.status(204).send("mobile number is not valid");
}

else{
    var queryStatement = "insert into users(first_name, last_name, email, password, mobile, address, is_archived, created, updated) values('"+req.body.first_name+"','"+req.body.last_name+"','"+req.body.email+"','"+req.body.password+"',"+req.body.mobile+",'"+req.body.address+"',0,now(),now())";

    console.log("query to be exectuted:: ",queryStatement);

    dbConnection.query(queryStatement,function(err,result){
		if(err) {
			console.log("error: ",err);
            res.status(400).send(err);	
            	
        } 
        else {
            console.log("success: ",result);
            if(result.affectedRows === 1 ) {
                
                console.log("successfull createUsers");
                res.status(201).send("user has been created successfully");		
            }
        }
        console.log("exiting from createUsers");
    });
}
}
// get users
exports.getOneUser = function (req, res) {

    console.log('req',req);
    console.log("entering into getUsers");
    // var users;
    // users = [{
    //     name:"refrigerator",
    //     price:"22000 INR"
    // },
    // {
    //     name:"iPhone X",
    //     age:"30000 INR"
    // }]
    
    dbConnection = db.getDbConnection();
   
        
//    var adr = 'http://localhost:3000/default.htm?year=2017&email= "+req.query.email+"';

 
//     var q = url.parse(adr, true);
//     console.log(q.search); 
//     var qdata = q.query;
  
//    console.log(qdata.email);


// Task.findById(req.params.email, function(err, result) {
//     if (err)
//       res.send(err);
//     res.json(result);
//   });

    //  var url_parts = url.parse(req.url, true);
    //  var query = url_parts.query;
     var ID = req.params.ID;
    
    var queryStatement = "select first_name, last_name, email, mobile, address from users where ID="+ID+" and is_archived=0";

    console.log("query to be exectuted:: ",queryStatement);

    dbConnection.query(queryStatement,function(err,result){
		if(err) {
			console.log("error: ",err);
			res.status(400).send(err);		
		} else{
            console.log("success: ",result);
            if(result.length === 0){
                res.status(204).send("no user found");
            } else {
                res.status(200).send(result);
            }
        }
        // else{
        //     console.log("no user found");
        //     res.status(200).send("no user found");
        // }
        console.log("exiting from getUsers");
    });
}

// get users
exports.getAllUsers = function (req, res) {
    console.log("entering into getAllUsers");
    // var users;
    // users = [{
    //     name:"refrigerator",
    //     price:"22000 INR"
    // },
    // {
    //     name:"iPhone X",
    //     age:"30000 INR"
    // }]
    
    dbConnection = db.getDbConnection();
    
    var queryStatement = "select first_name, last_name,email, mobile from users where is_archived=0";

    console.log("query to be exectuted:: ",queryStatement);

    dbConnection.query(queryStatement,function(err,result){
		if(err) {
			console.log("error: ",err);
            res.status(400).send(err);	
        }	
		//  else  {
        //     console.log("success: ",result);
        //     res.status(200).send(result);
        // }
        else{
            console.log("success: ",result);
            if(result.length === 0){
                res.status(204).send("no user found");
            } else {
                res.status(200).send(result);
            }
        }
        // else{
        //     console.log("no user found");
        //     res.status(401).send('no user found');
        // }
        console.log("exiting from getAllUsers");
    });
}

// delete users
exports.deleteUser = function(req, res) {
    
    console.log("entering into deleteUsers");
    
    // print inputs
    console.log("request body: ", req.body);

    dbConnection = db.getDbConnection();
    var ID = req.params.ID;
    var queryStatement = "update users set is_archived=1, updated = now() where ID="+ID+" And is_archived=0";
    console.log("query to be exectuted:: ",queryStatement);

    dbConnection.query(queryStatement,function(err,result){
		if(err) {
			console.log("error: ",err);
			res.status(400).send(err);		
        } 
        else 
        {
            console.log("in else condition");
            if(result.affectedRows === 1 ) {
                console.log("successfull deleteUsers");
                res.status(200).send("users has been deleted successfully");		
            }
             else{
               console.log("users is not exist");
                res.status(204).send("users is not found");		
                
         }
        }
        console.log("exiting from deleteUsers");
    });
}

// get users for edit
exports.getOneUserForEdit = function (req, res) {
    console.log("entering into getUsersForEdit");
    // var users;
    // users = [{
    //     name:"refrigerator",
    //     price:"22000 INR"
    // },
    // {
    //     name:"iPhone X",
    //     age:"30000 INR"
    // }]
    
    dbConnection = db.getDbConnection();
    
    var queryStatement = "select first_name, last_name, email, mobile, address from users where ID="+req.body.ID+" and is_archived=0";

    console.log("query to be exectuted:: ",queryStatement);

    dbConnection.query(queryStatement,function(err,result){
		if(err) {
			console.log("error: ",err);
            res.status(400).send(err);	
        }	
		//  else {
        //     console.log("success: ",result);
        //     res.status(200).send(result);
           
        // }
        else{
            console.log("success: ",result);
            if(result.length === 0){
                res.status(204).send("no user found");
            } else {
                res.status(200).send(result);
            }
        }
        // else{
        //     console.log("no user found");
        //     res.status(401).send('no user found');
        // }
        console.log("exiting from getUsersForEdit");
    });
}


// edit users
exports.editUser = function(req, res) {
    
    console.log("entering into editUsers");
    
    // print inputs
    console.log("request body: ", req.body);
    var ID = req.params.ID;
    

    if(req.body.first_name===undefined )
    {
        req.body.first_name='';
    }
    if(req.body.last_name===undefined )
    {
        req.body.last_name='';
    }
    if(req.body.address=== undefined )
    {
        req.body.address='';
    }
    if(req.body.mobile===undefined )
    {
        req.body.mobile= null;
    }

    var first_name= req.body.first_name;
    var last_name = req.body.last_name;
    
    var mobile=req.body.mobile;
    var address = req.body.address;

     if(first_name.length<3 || first_name.length>32)
        {
    console.log("invalid first_name");
    res.status(204).send("invalid first_name");

        }
    else if(last_name.length!=0 && (last_name.length<3 || last_name.length>32))
  
        {
        console.log("invalid last_name");
        res.status(204).send("invalid last_name");
         }

    else if(address.length!=0 && address.length>500)
  
    {
    console.log("invalid address");
    res.status(204).send("invalid address");
    }
 
    // else if(mobile!=null )

    // {
    // console.log("invalid mobile");
    // res.status(204).send("invalid mobile");
    // }

    else if(mobile!=null && mobile<6000000000  || mobile> 10000000000 )
    {
        console.log("mobile number is not valid")
        res.status(204).send("mobile number is not valid");
    }
     
    

    else{
         dbConnection = db.getDbConnection();
        var ID = req.params.ID;
   
   var queryStatement = "update users set first_name='"+req.body.first_name+"', last_name='"+req.body.last_name+"', mobile="+req.body.mobile+", address='"+req.body.address+"', updated= now() where ID="+ID+" and is_archived=0";
  // var queryStatement = "update users set first_name='"+req.body.first_name+"', last_name='"+req.body.last_name+"', mobile="+req.body.mobile+", address='"+req.body.address+"', updated= now() where first_name='"+req.body.first_name+"' and is_archived=0";

    console.log("query to be exectuted:: ",queryStatement);

    dbConnection.query(queryStatement,function(err,result){
		if(err) {
			console.log("error: ",err);
			res.status(400).send(err);		
        } 
        else 
        {
            console.log("in else condition");
            if(result.affectedRows === 1 ) {
                console.log("successfull editedUsers");
                res.status(200).send("users has been edited successfully");	
            }
             else{
               console.log("email is wrong");
                res.status(204).send("Users is not found");		
                
         }
        }
    
        console.log("exiting from editUsers");
    });
}
}





