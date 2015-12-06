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
app.controller('HomeCtrl', function ($scope) {});
app.controller('MainCtrl', function ($scope) {});

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