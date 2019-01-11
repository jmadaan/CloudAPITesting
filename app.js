var express = require('express');
var app = express();
var request = require('request');
var port = process.env.PORT || 3000;

var port = process.env.PORT || 3000;


const restApiUrl = 'ec2-user@ec2-13-56-232-7.us-west-1.compute.amazonaws.com'; // TODO: replace with dns once set up
// const restApiUrl = "api.i2chain.io"
const restApiPort = 8080;

app.set('view engine', 'ejs');

app.use('/assets', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/register', function(req, res) {
	
	console.log("Test Register API Call");
	/*request('http://www.google.com', function (error, response, body) {
	  console.log('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  //console.log('body:', body); // Print the HTML for the Google homepage.
	});*/

	let email = "test@i2chain.com";
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
        //console.log('body:', JSON.stringify(body));
      }
    );

	
});
app.get('/getall', function(req, res) {
	
	console.log("Test getAll API Call");
	/*request('http://www.google.com', function (error, response, body) {
	  console.log('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  //console.log('body:', body); // Print the HTML for the Google homepage.
	});*/

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



app.get('/ejstest', function(req, res) {
	
	let message = "View Engine is EJS";
	res.render('index', {serverMessage: message});
	
});

app.listen(port);


