angular.module('i2ChainApiTest', []);

angular.module('i2ChainApiTest')
	.controller('MainController', ctrlFunc);
	
function ctrlFunc() {
	console.log(clientMessage);
	this.message = clientMessage;
}