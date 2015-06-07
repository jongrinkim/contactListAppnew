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

	
}
