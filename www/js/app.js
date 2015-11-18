//var apiUrl = "http://localhost:8082/ITL/Trucking/custom/service/v4_1/rest.php";
var apiUrl = "http://trucking.giaiphapcrm.info/custom/service/v4_1/rest.php";
var rootUser = 'web_service_admin';
var rootPass = '^BQ^d.ndAG96gDY';
var app = angular.module('ionicApp', ['ionic', 'ngCookies', 'google.places', 'ionic-datepicker', 'ngCordova', 'Recordservices', 'jett.ionic.filter.bar']);
app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
});
app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider) {
    $ionicConfigProvider.tabs.position('bottom'); // other values: top
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
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
                'mainContent': {
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
        .state('main.menu.viewmap', {
            url: "/viewmap/:address",
            views: {
                'menuContent': {
                    templateUrl: "templates/map.html",
                    controller: 'MapCtrl',
                }
            }
        })
        .state('main.menu.tabs', {
            url: "/tab",
            views: {
                'mainContent': {
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
        // Route cua complaint list #/menu/tab/complaints
        .state('main.menu.complaints', {
            url: "/complaints",
            views: {
                'menuContent': {
                    templateUrl: "templates/complaint/listview_complaint.html",
                    controller: 'ListComplaintCtrl',
                }
            }
        })
        // Route xem chi tiet complaint  #/main/menu/view_complaint/{{complaint.name_value_list.id.value}}
        .state('main.menu.view_complaint', {
            url: "/view_complaint/:id",
            views: {
                'menuContent': {
                    templateUrl: "templates/complaint/detailview_complaint.html",
                    controller: 'ViewComplaintCtrl',
                }
            }
        })
        .state('main.menu.create_record', {
            url: "/create_record",
            views: {
                'menuContent': {
                    templateUrl: "templates/complaint/new_record.html",
                    controller: 'RecordCtrl',
                }
            }
        });

    $urlRouterProvider.otherwise("/main/login");

});