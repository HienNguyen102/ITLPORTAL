app.controller('AppCtrl', function ($scope, $cordovaCamera, $cordovaCapture, $cordovaMedia, $state, $ionicLoading, $rootScope, $cordovaNetwork, $cordovaGeolocation) {
    $scope.countImagesCapture = 0;
    $scope.takePicture = function () {
        var options = {
            quality: 40,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.PNG,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            /* $ionicLoading.show({
                 templateUrl: 'templates/loading.html',
                 animation: 'fade-in',
                 showBackdrop: true,
                 maxWidth: 200,
                 showDelay: 0
             });*/
            $scope.lastTakePhoto = "data:image/png;base64," + imageData;
            $scope.countImagesCapture = 1;
            $scope.imageDataBase64 = imageData;
            //$ionicLoading.hide();
        }, function (err) {
            // error
        });

    };
    $scope.checkNetWork = function () {
        var type = $cordovaNetwork.getNetwork();

        var isOnline = $cordovaNetwork.isOnline();
        var isOffline = $cordovaNetwork.isOffline();
        $scope.isOnline = isOnline;
        $scope.isOffline = isOffline;
        if (isOffline) {
            alert("Không có kết nối mạng, hãy bật kết nối");
            //Hide loading
            $ionicLoading.hide();
            return;
        }

        // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
            var onlineState = networkState;
            $scope.isOnline = true;
            $scope.isOffline = false;
            //alert(onlineState);
        })

        // listen for Offline event
        $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {

            $scope.isOnline = false;
            $scope.isOffline = true;
            var offlineState = networkState;
            alert("Không có kết nối mạng, hãy bật kết nối");
            $ionicLoading.hide();
            return;
        })
    };
});

app.controller('MenuCtrl', function ($scope, $ionicSideMenuDelegate, $ionicModal, $location, $ionicPopover) {
    //Khoi tao form tao meeting
    $ionicModal.fromTemplateUrl('templates/meeting/editview.html', function (meetingModal) {
        $scope.meetingModal = meetingModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
    });

    $scope.openModal = function () {
        $scope.meetingModal.show();
    };
    $scope.closeModal = function () {
        $scope.meetingModal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.meetingModal.remove();
    });
    // Execute action on hide modal
    $scope.$on('meetingModal.hidden', function () {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('meetingModal.removed', function () {
        // Execute action
    });
    //$location.path("main/menu/home");
    //CallModal
    $ionicModal.fromTemplateUrl('templates/call/addCallView.html', function (addCallModal) {
        $scope.addCallModal = addCallModal;
    }, {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
    });

    $scope.openAddCallModal = function () {
        $scope.addCallModal.show();
    };
    $scope.closeAddCallModal = function () {
        $scope.addCallModal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.addCallModal.remove();
    });
});
app.controller('LoginCtrl', function ($scope, $cookies, $cookieStore, $ionicLoading, $ionicPopup, $location, $state, UserService) {
    $scope.login = function (data) {
        $scope.checkNetWork();
        $ionicLoading.show({
            templateUrl: 'templates/loading.html',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        if ($scope.isOffline) {
            $ionicLoading.hide();
        }
        localStorage.clear();
        var sessionId = "";
        UserService.login(data.user_name, data.password, function (result) {
            $ionicLoading.hide();
            if (result.id != null) {
                UserService.getUserInfo(result.id, result.name_value_list.user_id.value, function (userInfo) {
                    var data = {
                        sessionId: result.id,
                        userId: result.name_value_list.user_id.value,
                        userInfo: userInfo
                    };
                    //$cookieStore.put('data', JSON.stringify(data));
                    localStorage.setItem("data", JSON.stringify(data));
                    //debugger;
                    // $location.path("main/menu");
                    $state.go('main.menu.home');
                });
            } else {
                $ionicPopup.alert({
                    title: 'Thông báo',
                    subTitle: 'Tên đăng nhập hoặc mật khẩu không đúng',
                });
            }
        });
    }
});
app.controller('HomeCtrl', function ($scope) {});
app.controller('MainCtrl', function ($scope) {});
app.controller('ListCtrl', function ($scope) {

    $scope.data = {
        showDelete: false
    };

    $scope.itemButtons = [
        {
            text: 'Delete',
            type: 'button-assertive',
            onTap: function (item) {
                alert('Delete Item: ' + item.id + ' ?');
            }
    }
  ];

    $scope.onItemDelete = function (item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
    };

    $scope.items = [
        {
            id: 1
    },
        {
            id: 2
    },
        {
            id: 3
    },
        {
            id: 4
    },
        {
            id: 5
    },
        {
            id: 6
    },
        {
            id: 7
    },
        {
            id: 8
    },
        {
            id: 9
    },
        {
            id: 10
    }
  ];

});
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