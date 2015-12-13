app.controller('MapCtrl', function ($scope, $ionicLoading, $stateParams, $cordovaGeolocation, $ionicPopup, $ionicHistory) {
    console.log("mapctrl");

    debugger;
    var address = decodeURIComponent($stateParams.address);
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
            $scope.map = map;
        } else {
            var mapPopup = $ionicPopup.show({
                template: 'Không thể xác định vị trí trên bản đồ',
                title: 'Lỗi',
                buttons: [
                    {
                        text: '<b>Quay lại</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            $ionicHistory.goBack();
                        }
      },
                    {
                        text: 'Hủy'
                    }
    ]
            });
        }
    });
});