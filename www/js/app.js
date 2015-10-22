var apiUrl = "http://localhost:8082/ITL/Trucking/custom/service/v4_1/rest.php";
var app = angular.module('ionicApp', ['ionic'])
// Cau hinh route
app.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('menu', {
      url: "/menu",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'MenuCtrl'
    })
    .state('menu.tabs', {
      url: "/tab",
      views: {
        'menuContent' :{
          templateUrl: "templates/tabs.html"
        }
      }
    })
    .state('menu.home', {
      url: "/home",
      views :{
          'menuContent': {
              templateUrl: "templates/home.html",
              controller: 'HomeCtrl'
          }
        }
    })
    .state('menu.tabs.login', {
        url: "/login",
        views :{
            'view-tab': {
                templateUrl: "templates/user/login.html",
                controller: 'LoginCtrl',
            }
        }
  })
  //Cau hinh route cho module meeting
  // Route cua meeting list
    .state('menu.tabs.meetings', {
        url: "/meetings",
        views: {
            'view-tab': {
                templateUrl: "templates/meeting/listview.html",
                controller: 'ListMeetingCtrl',
            }
        }
    })
  // Route xem chi tiet meeting
  .state('menu.tabs.viewmeeting', {
    url: "/viewmeeting",
        views: {
            'view-tab': {
                templateUrl: "templates/meeting/detailview.html",
//                controller: 'ViewMeetingCtrl',
            }
        }
  })
  //Route tao meeting
    .state('menu.meetings.create', {
        url: "/create",
        views: {
            'menuContent': {
                templateUrl: "templates/meeting/editview.html",
                controller: 'CreateMeetingCtrl',
            }
        }
    })
    .state('menu.meetings.view', {
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
    
  $urlRouterProvider.otherwise("menu/tab/meetings");

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
              
              