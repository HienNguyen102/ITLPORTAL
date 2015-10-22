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
    });
    
  $urlRouterProvider.otherwise("menu/tab/meetings");

})
              
              