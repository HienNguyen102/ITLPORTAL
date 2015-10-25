//var apiUrl = "http://localhost:8082/ITL/Trucking/custom/service/v4_1/rest.php";
var apiUrl = "http://trucking.giaiphapcrm.info/custom/service/v4_1/rest.php";
var rootUser = 'web_service_admin';
var rootPass = '^BQ^d.ndAG96gDY';
var app = angular.module('ionicApp', ['ionic', 'ngCookies',  'google.places', 'ngCordova']);
// Cau hinh route
app.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('main', {
      url: "/main",
      abstract: true,
      templateUrl: "templates/main.html",
      controller: 'MainCtrl'
    })
    .state('main.login', {
        url: "/login",
        views: {
            'mainContent' : {
                templateUrl: "templates/user/login.html",
            }
        }
    })
    .state('main.menu', {
      url: "/menu",
      views: {
          'mainContent': {
              templateUrl: "templates/menu.html",
              controller: 'MenuCtrl'
          }
        }
    })
    .state('main.menu.home', {
      url: "/home",
      views: {
          'menuContent': {
              templateUrl: "templates/home.html",
              controller: 'HomeCtrl'
          }
        }
    })
    .state('main.viewmap', {
      url: "/viewmap",
      views: {
          'menuContent': {
              templateUrl: "templates/map.html",
              controller: 'MapCtrl'
          }
        }
    })
    .state('main.menu.tabs', {
      url: "/tab",
      views: {
        'mainContent' :{
          templateUrl: "templates/tabs.html"
        }
      }
    })
  //Cau hinh route cho module meeting
  // Route cua meeting list
    .state('main.menu.meetings', {
        url: "/meetings",
        views: {
            'menuContent': {
                templateUrl: "templates/meeting/listview.html",
                controller: 'ListMeetingCtrl',
            }
        }
    })
  // Route xem chi tiet meeting
  .state('main.menu.viewmeeting', {
    url: "/viewmeeting/:id",
        views: {
            'menuContent': {
                templateUrl: "templates/meeting/detailview.html",
                controller: 'ViewMeetingCtrl',
            }
        }
  })
  //Route tao meeting
    .state('main.menu.meetings.create', {
        url: "/create",
        views: {
            'menuContent': {
                templateUrl: "templates/meeting/editview.html",
                controller: 'CreateMeetingCtrl',
            }
        }
    })
    .state('main.menu.meetings.view', {
        url: "/view",
        views: {
            'menuContent': {
                templateUrl: "templates/meeting/listview.html",
                controller: 'ViewMeetingCtrl',
            }
        }
    })
  //Cau hinh route cho module complaint
  // Route cua complaint list
    .state('menu.tabs.complaints', {
        url: "/complaints",
        views: {
            'view-tab': {
                templateUrl: "templates/complaint/listview.html",
                controller: 'ListComplaintCtrl',
            }
        }
    });
    
  $urlRouterProvider.otherwise("/main/login");

})
// Cac ham xu ly trong controller
.controller('ListCtrl', function ($scope) {

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
  
 .controller('AppCtrl', function() {

  ionic.Platform.ready(function() {

  });

 })
 .controller('CreateMeetingCtrl', function($scope) {
    $scope.send = function(data){
        alert(data.title + data.location);
    }
})
// Xu ly cua controller ListMeetingCrtl
 .controller('ListMeetingCtrl', function($scope, $ionicSideMenuDelegate, $ionicModal) {
    // Khoi tao form nhap lieu khi nguoi dung den trang list view cua meeting, khi nguoi dung
    // nhan nut tao o phia tren goc phai thi hien thi form len cho nhap lieu
    $ionicModal.fromTemplateUrl('templates/meeting/editview.html', function (meetingModal) {
    $scope.meetingModal = meetingModal;
  }, {
    animation: 'slide-in-up'
  });
 })
// Xu ly cua controller ListComplaintCtrl
 .controller('ListComplaintCtrl', function($scope, $ionicSideMenuDelegate, $ionicModal) {
    $ionicModal.fromTemplateUrl('templates/meeting/editview.html', function (meetingModal) {
    $scope.meetingModal = meetingModal;
  }, {
    animation: 'slide-in-up'
  });
 });
              
              