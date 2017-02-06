
var app = angular.module("Batsignal", []);

app.controller("MainController", ["$scope","$http", function($scope, $http){
    var myFriendemail="";
    //$scope.batFriends = [];

    $scope.sendData = function(){

        var dataToSend = {
            friendname: $scope.friendname,
            friendemail:$scope.friendemail
      };

        $http.post('/batfriends/addfriends', dataToSend).then(function(response){
            $scope.friendoes = response.data;
        });
        console.log(dataToSend);

    };

    $scope.getData = function(){
        console.log("button working");
        $http.get('/batfriends/getfriends').then(function(response){
            console.log(response.data);
            console.log(response.data[0].local.friends[0].friendname);
            //var names = response.data[0].local.friends[0].friendname;

            $scope.friendoes=response.data[0].local.friends;
            //console.log(names);

        });
    };

    $scope.gettingEmail = function() {
        myFriendemail=(this.batfriend.friendemail);
        console.log(myFriendemail);

    };



//========= BATMESSAGE CONTROLLER ======\\

//app.controller("BatMessage", ['$scope','$http', function ($scope, $http){

    $scope.sendBatsignal = function () {

    //$scope.gettingEmail = function() {
    //    var myFriendemail=(this.batfriend.friendemail);
    //    //console.log(this.batfriend.friendemail);
    //    console.log(myFriendemail);
    //}


    //CREATING A HUMONGOUS NG-CLICK FUNCTION


            console.log('Radio value', myFriendemail);

            //EMAIL

            console.log($scope.$parent.selectedFriend);

            console.log("getting message");
            var grabMessage = angular.element(document.querySelector('#inputID'));
            var messageToSend = (grabMessage.val());


            ///========= GEOLOCATION FUNCTION =========\\\

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                batavar.innerHTML = "Geolocation is not supported by this browser.";
            }

            function showPosition(position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
                var latlon = lat + "," + lon;

                console.log(latlon);

                var sendData = {message: messageToSend, myLocation: latlon, myEmail:myFriendemail};

                $http.post('/sendbatemail', sendData).then(function (response) {
                    $scope.someBatStuff = response.data;
                });
                window.location="/confirmation";
            }


            function showError(error) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        batavar.innerHTML = "User denied the request for Geolocation."
                        break;
                    case error.POSITION_UNAVAILABLE:
                        batavar.innerHTML = "Location information is unavailable."
                        break;
                    case error.TIMEOUT:
                        batavar.innerHTML = "The request to get user location timed out."
                        break;
                    case error.UNKNOWN_ERROR:
                        batavar.innerHTML = "An unknown error occurred."
                        break;
                }
            }




        };

}]);
//

