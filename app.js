var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;


const restApiUrl = 'ec2-user@ec2-13-56-232-7.us-west-1.compute.amazonaws.com'; // TODO: replace with dns once set up
// const restApiUrl = "api.i2chain.io"
//const restApiUrl = 'localhost';
const restApiPort = 8080;

app.set('view engine', 'ejs');

app.use('/assets', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  let message = "I2Chain API Testing Stack";
  res.render('home', {serverMessage: message});
});

app.get('/getall', function(req, res) {
  
  console.log("Test getAll API Call");
  request.get(
      {
        uri: `http://${restApiUrl}:${restApiPort}/api/user/getAll/`,
        headers: {
          connection: 'keep-alive'

        },
        json: true
      },
      (error, response, body) => {
        //console.log('Sent getAll:\n', body);
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response.statusCode); 
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //console.log('body:', JSON.stringify(body));
        let message = body;
        res.render('index', {serverMessage: message});

      }
    );
});

app.get('/loginform', function(req, res) {
  console.log("Enter Data for Login API Call");
  let message = "Enter Data for Login API Call";
  res.render('loginform', {serverMessage: message});
});

app.get('/registerform', function(req, res) {
  console.log("Enter Data for Register API Call");
  let message = "Enter Data for Register API Call";
  res.render('registerform', {serverMessage: message});
});

app.get('/finduserform', function(req, res) {
  console.log("Enter Data for Login API Call");
  let message = "Find User";
  res.render('finduserform', {serverMessage: message});
});

app.get('/adminuserform', function(req, res) {
  console.log("Enter Data for Admin Activities Call");
  let message = "Admin User";
  res.render('adminuserform', {serverMessage: message});
});


app.post('/login', function(req, res) {
  console.log("Test Login API Call");
  console.log(req.body.username);
  console.log(req.body.password);
  let message = "Login API Test";
  //let email = "test1@i2chain.com";
  //let password = "password123";
  let email = req.body.username;
  let password = req.body.password;

  const params = {
      email,
      password
    };
  request.post(
      {
        uri: `http://${restApiUrl}:${restApiPort}/api/user/login/`,
        body: params,
        json: true
      },
      (error, response, body) => {
        //console.log('Sent register:\n', params, body);
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        let message = "Login API Test";
        //let message1 = JSON.stringify(body.value);
        //console.log("status: " + body.status);
        if (body.status === "success")
          apiResponse = "Login Successful: " + JSON.stringify(body.value);
        else 
          apiResponse = "Login Failed: "+ JSON.stringify(body.value);
        res.render('login', {serverMessage: message, apiResponse: apiResponse});
        console.log('body:', JSON.stringify(body));
      }
    );
});

app.post('/register', function(req, res) {
	console.log("Test Register API Call");
  console.log(req.body.username);
  console.log(req.body.password);
  let message = "Register API Test";
	/*request('http://www.google.com', function (error, response, body) {
	  console.log('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  //console.log('body:', body); // Print the HTML for the Google homepage.
	});*/
	//let email = "test1@i2chain.com";
	//let password = "password123";
	let pubKey = "pubkey123";
  let email = req.body.username;
  let password = req.body.password;
	const params = {
      email,
      password,
      pubKey
    };
	request.post(
      {
        uri: `http://${restApiUrl}:${restApiPort}/api/user/register/`,
        body: params,
        json: true
      },
      (error, response, body) => {
        //console.log('Sent register:\n', params, body);
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        let message = "Register API Test";
        if (body.status === "success")
          apiResponse = "Registration Successful: " + JSON.stringify(body.value);
        else 
          apiResponse = "Registration Failed: "+ JSON.stringify(body.value);
        res.render('register', {serverMessage: message, apiResponse: apiResponse});
        //res.render('register', {serverMessage: message});
        console.log('body:', JSON.stringify(body));
      }
    );	
});

app.post('/finduser', function(req, res) {
  console.log("Email: " + req.body.email);
  console.log("UserID: " + req.body.userId);
  console.log("Delete UserID: " + req.body.deleteUserId);
  console.log("DeleteFlag: " + req.body.deleteFlag);
  let email = req.body.email;
  let userid = req.body.userId;
  let deleteuserid = req.body.deleteUserId;
  let deleteFlag = req.body.deleteFlag;

  if (email) {
    let message = "Find User with Email API Test";
    const params = {
        email
      };
    request.post(
        {
          uri: `http://${restApiUrl}:${restApiPort}/api/user/email/`,
          body: params,
          json: true
        },
        (error, response, body) => {
          //console.log('Sent register:\n', params, body);
          console.log('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          let message = "Find User API Test";
          if (body)
            apiResponse = "Find User Success with email: " + email + ". UserId : " +
                          JSON.stringify(body.id);
          else 
            apiResponse = "Find User Failed with email: " +   email;
          res.render('finduser', {serverMessage: message, apiResponse: apiResponse});
          //res.render('register', {serverMessage: message});
          console.log('body:', JSON.stringify(body));
        }
      );
  }
  else if (userid) {
     console.log("UserID: " + req.body.userId);
     let message = "Find User with UserID API Test";
      /*const params = {
          email
        };*/
      request.get(
          {
            uri: `http://${restApiUrl}:${restApiPort}/api/user/`+userid,
            json: true
          },
          (error, response, body) => {
            //console.log('Sent register:\n', params, body);
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            let message = "Find User API Test";
            if (body)
              apiResponse = "Find User Success with email: "  +
                            JSON.stringify(body.email);
            else 
              apiResponse = "Find User Failed with userID: " +   userid;
            res.render('finduser', {serverMessage: message, apiResponse: apiResponse});
            //res.render('register', {serverMessage: message});
            console.log('body:', JSON.stringify(body));
          }
        ); 
  }
  else if (deleteuserid != null && deleteFlag == 'Y') {
    console.log("Delete userID: " + deleteuserid);
    console.log("Delete Flag: " + deleteFlag);
    let message = "Delete User API Test";
    apiResponse = "Delete User API Test: ";
    request.delete(
      {
        uri: `http://${restApiUrl}:${restApiPort}/api/user/`+deleteuserid,
        json: true
      },
      (error, response, body) => {
        //console.log('Sent register:\n', params, body);
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        let message = "Delete User API Test";
        if (body)
          apiResponse = "Delete User Success with userID: " + deleteuserid;
        else 
          apiResponse = "Delete User Failed with userID: " + deleteuserid;
        res.render('finduser', {serverMessage: message, apiResponse: apiResponse});
        //res.render('register', {serverMessage: message});
        console.log('body:', JSON.stringify(body));
      }
    ); 
    //res.render('finduser', {serverMessage: message, apiResponse: apiResponse});
  }
});

app.post('/adminuser', function(req, res) {
  console.log("UserID: " + req.body.userId);
  console.log("Password: " + req.body.pwd);
  console.log(" Forgot Password UserId: " + req.body.userIdFrgPwd);
  let userid = req.body.userId;
  let pwd = req.body.pwd;
  let userIdPwd = req.body.userIdPwd;
  let userIdFrgPwd = req.body.userIdFrgPwd;
  if (userid) {
    let message = "Activate User with UserID API Test";
    request.get(
      {
        uri: `http://${restApiUrl}:${restApiPort}/api/user/activation/`+userid,
        json: true
      },
      (error, response, body) => {
        //console.log('Sent register:\n', params, body);
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        if (body && response.statusCode == 200)
          apiResponse = "Activate User Success with userId: " +   userid;
        else 
          apiResponse = "Activate User Failed with userID: " +   userid;
        res.render('adminuser', {serverMessage: message, apiResponse: apiResponse});
        //res.render('adminuser', {serverMessage: message});
        console.log('body:', JSON.stringify(body));
      }
    ); 
   // apiResponse = "Activate User Success with userId: " +   userid;
    //res.render('adminuser', {serverMessage: message, apiResponse: apiResponse});
  }
  else if (pwd)
  {
    let message = "Change Password API Test";
    apiResponse = "Change Password: ";
    const params = {
      pwd
    };
    request.put(
      {
        uri: `http://${restApiUrl}:${restApiPort}/api/user/changepwd/`+userIdPwd,
        body: params,
        json: true
      },
      (error, response, body) => {
        //console.log('Sent register:\n', params, body);
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        if (body)
          apiResponse = "Password Change Success for user with userId: " +   userIdPwd;
        else 
          apiResponse = "Password Change Failed for user with userId: " +   userIdPwd;
        res.render('adminuser', {serverMessage: message, apiResponse: apiResponse});
        //res.render('adminuser', {serverMessage: message});
        console.log('body:', JSON.stringify(body));
      }
    ); 

    //res.render('adminuser', {serverMessage: message, apiResponse: apiResponse});
  }
  else if (userIdFrgPwd) {
    let message = "Forgot Password API Test";
    apiResponse = "Forgot Password: ";
    console.log(" In Forgot Password Method: " + userIdFrgPwd);
    request.put(
      {
        uri: `http://${restApiUrl}:${restApiPort}/api/user/forgotpwd/`+userIdFrgPwd,
        json: true
      },
      (error, response, body) => {
        //console.log('Sent register:\n', params, body);
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        if (body)
          apiResponse = "Forgot Password Success for user with userId: " +   userIdFrgPwd;
        else 
          apiResponse = "Forgot Password Failed for user with userId: " +   userIdFrgPwd;
        res.render('adminuser', {serverMessage: message, apiResponse: apiResponse});
        //res.render('adminuser', {serverMessage: message});
        console.log('body:', JSON.stringify(body));
      }
    ); 
    //res.render('adminuser', {serverMessage: message, apiResponse: apiResponse});
  }
});  

app.get('/ejstest', function(req, res) {
	
	let message = "View Engine is EJS";
	res.render('home', {serverMessage: message});
	
});

app.listen(port);


