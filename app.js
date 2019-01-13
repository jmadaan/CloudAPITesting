var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;


const restApiUrl = 'ec2-user@ec2-13-56-232-7.us-west-1.compute.amazonaws.com'; // TODO: replace with dns once set up
// const restApiUrl = "api.i2chain.io"
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
  let message = "LoginForm Data";
  res.render('loginform', {serverMessage: message});
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
          apiResponse = "Login Successful";
        else 
          apiResponse = "Login Failed";
        res.render('login', {serverMessage: message, apiResponse: apiResponse});
        console.log('body:', JSON.stringify(body));
      }
    );
});

app.get('/register', function(req, res) {
	console.log("Test Register API Call");
	/*request('http://www.google.com', function (error, response, body) {
	  console.log('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  //console.log('body:', body); // Print the HTML for the Google homepage.
	});*/
	let email = "test1@i2chain.com";
	let password = "password123";
	let pubKey = "pubkey123";
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
        res.render('register', {serverMessage: message});
        console.log('body:', JSON.stringify(body));
      }
    );	
});

app.get('/ejstest', function(req, res) {
	
	let message = "View Engine is EJS";
	res.render('home', {serverMessage: message});
	
});

app.listen(port);


