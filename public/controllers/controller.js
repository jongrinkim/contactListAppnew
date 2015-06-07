function AppCtrl($scope, $http) {
	console.log("Hello world from controller")

var refresh = function() {

	$http.get('/contactlist').success(function(response) {
		console.log("I got the data I requested");
		$scope.contactlist = response;
		$scope.contact = "";
	});
}

refresh();

$scope.addContact = function() {
	console.log($scope.contact);
	$http.post('/contactlist', $scope.contact).success(function(response) {
		console.log(response);
		refresh();
	});
};

//To have it so that wanna-delete ID shows up on the command prompt
//Step 37: Server is receiving what controller is sending 
$scope.remove = function(id) {
	console.log(id);
	//success part allow browser to refresh everytime delete is conducted
	$http.delete('/contactlist/' + id).success(function(response) {
		refresh();
	});
};

//Step 40: define the edit button: use GET request
$scope.edit = function(id) {
	console.log(id);
	$http.get('/contactlist/' + id).success(function(response) {
		$scope.contact = response;
	});
};
//Step 42: use PUT request to send the data to server to be updated
//id and contact will be sent to server
$scope.update = function() {
	console.log($scope.contact._id);
	$http.put('/contactlist/' + $scope.contact_id, $scope.contact)
};
	
}
