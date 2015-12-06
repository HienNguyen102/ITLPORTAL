
app.controller('MapCtrl', function ($scope, $ionicLoading, $stateParams, $cordovaGeolocation) {
    console.log("mapctrl");
    /*var options = {
        enableHighAccuracy: true
    };

    navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude
        var long = position.coords.longitude
        alert("lat: " + lat + " long: " + long);
    }, function (err) {
        alert("loi navigator geolocation");
    }, function () {
        alert("options");
    });*/

    var posOptions = {
        enableHighAccuracy: false
    };
    $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
            var lat = position.coords.latitude
            var long = position.coords.longitude
            alert("lat: " + lat + " long: " + long);
        }, function (err) {
            alert("loi");
        });



    //debugger;
    /*var address = decodeURIComponent($stateParams.address);
    $ionicLoading.show({
        templateUrl: 'templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    var myLatlng = new google.maps.LatLng(43.07493, -89.381388);
    var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    debugger;
    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        $ionicLoading.hide();
        if (status === google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
    $scope.map = map;*/
});