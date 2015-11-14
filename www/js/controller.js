app.controller('AppCtrl', function ($scope, $cordovaCamera) {

    $scope.takePicture = function () {
        $cordovaCamera.getPicture({}).then(function (imageData) {
            alert("SUccess");
        }, function (err) {
            alert("ERRor");
        });
    };
});
// Cac ham xu ly trong controller
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

app.controller('HomeCtrl', function ($scope) {});

app.controller('MainCtrl', function ($scope) {});
app.controller('ButtonsTabCtrl', function ($scope, $ionicPopup, $ionicActionSheet, $ionicModal) {
    $scope.showPopup = function () {
        $ionicPopup.alert({
            title: 'Popup',
            content: 'This is ionic popup alert!'
        });
    };
    $scope.showActionsheet = function () {
        $ionicActionSheet.show({
            titleText: 'Ionic ActionSheet',
            buttons: [
                {
                    text: 'Facebook'
            },
                {
                    text: 'Twitter'
            },
          ],
            destructiveText: 'Delete',
            cancelText: 'Cancel',
            cancel: function () {
                console.log('CANCELLED');
            },
            buttonClicked: function (index) {
                console.log('BUTTON CLICKED', index);
                return true;
            },
            destructiveButtonClicked: function () {
                console.log('DESTRUCT');
                return true;
            }
        });
    };
});

app.controller('SlideboxCtrl', function ($scope, $ionicSlideBoxDelegate) {
    $scope.nextSlide = function () {
        $ionicSlideBoxDelegate.next();
    }
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
    //Hien

    $ionicPopover.fromTemplateUrl('templates/complaint/attachmentview.html', {
        scope: $scope
    }).then(function (viewImagePopover) {
        $scope.viewImagePopover = viewImagePopover;
        //$('#image_preview_inpop').attr('src', $scope.srcSelectedImage);
    });


    $scope.openPopover = function ($event) {
        console.log("OpenPop");
        //console.log($scope.test_thoi);
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            alert('The File APIs are not fully supported in this browser.');
            return;
        }
        input = document.getElementById('fileInput');
        if (!input) {
            alert("Um, couldn't find the fileinput element.");
        } else if (!input.files) {
            alert("This browser doesn't seem to support the `files` property of file inputs.");
        } else if (!input.files[0]) {
            alert("Please select a file before clicking 'Load'");
        } else {
            file = input.files[0];
            fr = new FileReader();
            fr.onload = function (event) {
                //debugger;
                $('#image_preview_inpop').attr('src', event.target.result);
                $scope.viewImagePopover.show($event);
            }
        };

        //fr.readAsText(file);
        fr.readAsDataURL(file);
        //        $scope.viewImagePopover.show($event);
    };
    $scope.closePopover = function () {
        $scope.viewImagePopover.hide();
    };
    //Cleanup when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.viewImagePopover.remove();
    });
    // Execute action on hide
    $scope.$on('viewImagePopover.hidden', function () {
        // Execute action
    });
    // Execute action on remove
    $scope.$on('viewImagePopover.removed', function () {
        // Execute action
    });
});
app.controller('LoginCtrl', function ($scope, $cookies, $cookieStore, $ionicLoading, $ionicPopup, $location, $state, UserService) {
    $scope.login = function (data) {
        $ionicLoading.show({
            templateUrl: 'templates/loading.html',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        var sessionId = "";
        UserService.login(data.user_name, data.password, function (result) {
            $ionicLoading.hide();
            //debugger;
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
app.controller('ViewMeetingCtrl', function ($scope, $cookies, $cookieStore, $ionicLoading, $stateParams, MeetingService) {
    $ionicLoading.show({
        templateUrl: 'templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    //var sessionId = JSON.parse($cookieStore.get('data')).sessionId;
    var sessionId = JSON.parse(localStorage.getItem('data')).sessionId;
    MeetingService.getMeetingById(sessionId, $stateParams.id, function (result) {
        $ionicLoading.hide();
        $scope.meeting = result;
        MeetingService.location = result.location.value;
    });

});
app.controller('MapCtrl', function ($scope, $ionicLoading, $stateParams) {
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
    $scope.map = map;
});
app.controller('CreateMeetingCtrl', function ($scope, $cookies, $cookieStore, $ionicLoading, $location, $filter, MeetingService) {
    // Set datetimepicker
    $scope.datepickerObject = {
        titleLabel: 'Chọn ngày', //Optional
        todayLabel: 'Hôm nay', //Optional
        closeLabel: 'Đóng', //Optional
        setLabel: 'OK', //Optional
        setButtonType: 'button-assertive', //Optional
        todayButtonType: 'button-assertive', //Optional
        closeButtonType: 'button-assertive', //Optional
        inputDate: new Date(), //Optional
        mondayFirst: true, //Optional
        templateType: 'popup', //Optional
        modalHeaderColor: 'bar-positive', //Optional
        modalFooterColor: 'bar-positive', //Optional
        from: new Date(2012, 8, 2), //Optional
        to: new Date(2018, 8, 25), //Optional
        callback: function (val) { //Mandatory
            datePickerCallback(val);
        }
    };
    var datePickerCallback = function (val) {
        if (typeof (val) === 'undefined') {
            console.log('No date selected');
        } else {
            $scope.datepickerObject.inputDate = val;
        }
    };
    $scope.send = function (data) {
        debugger;
        data.start_date = '31/10/2015 05:45pm' //$filter('date')($scope.datepickerObject.inputDate, "dd/MM/yyyy")+' 12:00 pm';
            /*var sessionId = JSON.parse($cookieStore.get('data')).sessionId;
            var userInfo = JSON.parse($cookieStore.get('data')).userInfo;
            var accountId = JSON.parse(userInfo).id;*/
        var sessionId = JSON.parse(localStorage.getItem('data')).sessionId;
        var accountId = JSON.parse(localStorage.getItem('data')).userId;
        $ionicLoading.show({
            templateUrl: 'templates/loading.html',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        MeetingService.sendMeeting(sessionId, accountId, data, function (result) {
            $ionicLoading.hide();
            $scope.meetingModal.hide();
            if (result.id != '') {
                $location.path('main/menu/viewmeeting/' + result.id);
            }
        });
    }
});
// Xu ly cua controller ListMeetingCrtl
app.controller('ListMeetingCtrl', function ($scope, $cookies, $cookieStore, $ionicSideMenuDelegate, $ionicModal, $ionicLoading, UserService, MeetingService) {
    // Lay danh sach meeting
    //debugger;
    $ionicLoading.show({
        templateUrl: 'templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    /*var sessionId = JSON.parse($cookieStore.get('data')).sessionId;
    var userInfo = JSON.parse($cookieStore.get('data')).userInfo;
    var accountId = JSON.parse(userInfo).id;*/
    var sessionId = JSON.parse(localStorage.getItem('data')).sessionId;
    var userInfo = JSON.parse(localStorage.getItem('data')).userInfo;
    var accountId = JSON.parse(userInfo).id
    MeetingService.getMeetingList(sessionId, accountId, function (result) {
        $scope.meetings = result.entry_list;
        $ionicLoading.hide();
    });



});
app.controller('ListComplaintCtrl', function ($scope, $cookies, $cookieStore, $ionicSideMenuDelegate, $ionicModal, $ionicLoading, UserService, ComplaintService) {

    /*$ionicModal.fromTemplateUrl('templates/complaint/editview.html', function (meetingModal) {
        $scope.meetingModal = meetingModal;
    }, {
        animation: 'slide-in-up'
    });*/

    // Lay danh sach complaint
    //debugger;
    $ionicLoading.show({
        templateUrl: 'templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    /*debugger;*/
    //console.log("lastname"+localStorage.getItem("data"));
    //console.log($cookieStore.get('data'));
    var sessionId = JSON.parse(localStorage.getItem('data')).sessionId;
    var userId = JSON.parse(localStorage.getItem('data')).userId;
    ComplaintService.getComplaintList(sessionId, userId, function (result) {
        $scope.complaints = result.entry_list;
        //console.log($scope.complaints);
        $ionicLoading.hide();
    });
    //console.log("controller listComplaint"+sessionId);



});
app.controller('ViewComplaintCtrl', function ($scope, $cookies, $cookieStore, $ionicLoading, $stateParams, UserService, ComplaintService) {
    //debugger;
    $ionicLoading.show({
        templateUrl: 'templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    var sessionId = JSON.parse(localStorage.getItem('data')).sessionId;
    ComplaintService.getComplaintById(sessionId, $stateParams.id, function (result, relationship_list) {
        //debugger;
        $ionicLoading.hide();
        $scope.complaint = result;
        //console.log(relationship_list);
        $scope.records = relationship_list[0].records;
        //debugger;
    });
    /*UserService.getUserInfo(JSON.parse($cookieStore.get('data')).sessionId, JSON.parse($cookieStore.get('data')).userId, function (userInfo) {
    });*/

});
app.controller('CloseComplaintCtrl', function ($scope, $cookieStore, $stateParams, ComplaintService) {
    $scope.close = function () {
        var sessionId = JSON.parse($cookieStore.get('data')).sessionId;
        ComplaintService.closeComplaint(sessionId, $stateParams.id);
        //console.log($stateParams.id);
    };
});
app.controller('CommentCtrl', function ($scope, $cookieStore, $stateParams, ComplaintService, $ionicPopup, $ionicPlatform) {
    $scope.sendComment = function (commentDes) {
        var sessionId = JSON.parse($cookieStore.get('data')).sessionId;
        var userId = JSON.parse($cookieStore.get('data')).userId;
        ComplaintService.sendCommentInService(sessionId, userId, commentDes, $stateParams.id);
    };
    $scope.readFile = function () {
        //console.log("ReadFile");
        ComplaintService.readFileInService($scope);
    };
    /*$scope.takePicture = function () {
        console.log("takepic");
        navigator.camera.getPicture(function (imageUri) {
                $scope.imgURI = "data:image/jpeg;base64," + imageUri;
            },
            function (error) {
                alert("Add photo failed " + error.code);
            }, {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI
            }
        );
    }*/
});
app.controller('ViewAttachmentCtrl', function ($scope, $cookies, $cookieStore, $ionicLoading, $location, $filter, MeetingService) {

});
app.controller('PictureCtrl', function ($scope, $cordovaCamera) {

    /*$scope.takePicture= function () {

      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation:true
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        var image = document.getElementById('blah');
        image.src = "data:image/jpeg;base64," + imageData;
      }, function(err) {
        // error
      });

    }*/
});