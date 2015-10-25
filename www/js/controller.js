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

})

.controller('HomeCtrl', function($scope) {
})

.controller('MainCtrl', function($scope) {
})

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
var options = {timeout: 10000, enableHighAccuracy: true};
    debugger;
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
  }, function(error){
    console.log("Could not get location");
  });
//    var mapView = new google.maps.Map(document.getElementById('map'), {
//        zoom: 8,
//        center: {lat: -34.397, lng: 150.644}
//    });
//    var geocoder = new google.maps.Geocoder();
//    geocoder.geocode({'address': 'Thành Phố Hồ Chí Minh'}, function(results, status) {
//    if (status === google.maps.GeocoderStatus.OK) {
//      mapView.setCenter(results[0].geometry.location);
//      var marker = new google.maps.Marker({
//        map: mapView,
//        position: results[0].geometry.location
//      });
//      $scope.map = mapView;
//    } else {
//      alert('Geocode was not successful for the following reason: ' + status);
//    }
//  });
})

.controller('ButtonsTabCtrl', function ($scope, $ionicPopup, $ionicActionSheet, $ionicModal) {
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
})

.controller('SlideboxCtrl', function($scope, $ionicSlideBoxDelegate) {
  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
  }             
})              

.controller('MenuCtrl', function($scope, $ionicSideMenuDelegate, $ionicModal) {              
  $ionicModal.fromTemplateUrl('templates/modal.html', function (modal) {
    $scope.modal = modal;
  }, {
    animation: 'slide-in-up'
  });
    $ionicModal.fromTemplateUrl('templates/meeting/editview.html', function (meetingModal) {
    $scope.meetingModal = meetingModal;
  }, {
    animation: 'slide-in-up'
  });
 })
  
 .controller('AppCtrl', function($location) {

  ionic.Platform.ready(function() {
  });

 })
 .controller('LoginCtrl', function($scope, $cookies, $cookieStore, $ionicLoading, $ionicPopup, $location, UserService) {
    $scope.login = function(data) {
        $ionicLoading.show({
            templateUrl: 'templates/loading.html',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        var sessionId = "";
        debugger;
        UserService.login(data.user_name, data.password, function(result){
            $ionicLoading.hide();
            if(result.id != null) {
//                debugger;
                UserService.getUserInfo(result.id.value, function(result){
                    debugger;
                });
                var userInfo = {
                    sessionId: result.id,
                    id: result.id.value
                }
                $cookieStore.put('userInfo', JSON.stringify(userInfo));
                $location.path("main/menu/home");
            }else {
                $ionicPopup.alert({
                    title: 'Thông báo',
                    subTitle: 'Tên đăng nhập hoặc mật khẩu không đúng',
                });
            }
        });
    }
})
.controller('ViewMeetingCtrl', function($scope, $cookies, $cookieStore, $ionicLoading, $stateParams, MeetingService){
    debugger;
    $ionicLoading.show({
            templateUrl: 'templates/loading.html',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
    });
    var sessionId = JSON.parse($cookieStore.get('userInfo')).sessionId;
    MeetingService.getMeetingById(sessionId, $stateParams.id, function(result) {
        debugger;
        $ionicLoading.hide();
        $scope.meeting = result;
    });

})
.controller('CreateMeetingCtrl', function($scope) {
    $scope.send = function(data){
        alert(data.title + data.location);
    }
})
// Xu ly cua controller ListMeetingCrtl
 .controller('ListMeetingCtrl', function($scope, $cookies, $cookieStore, $ionicSideMenuDelegate, $ionicModal, $ionicLoading, UserService, MeetingService) {
    
    $ionicModal.fromTemplateUrl('templates/meeting/editview.html', function (meetingModal) {
        $scope.meetingModal = meetingModal;
    }, {
        animation: 'slide-in-up'
    });
    
    // Lay danh sach meeting
    //debugger;
    $ionicLoading.show({
        templateUrl: 'templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    debugger;
    var sessionId = JSON.parse($cookieStore.get('userInfo')).sessionId;
    MeetingService.getMeetingList(sessionId, function(result){
            $scope.meetings = result.entry_list;
            $ionicLoading.hide();
    });
    
    

 });