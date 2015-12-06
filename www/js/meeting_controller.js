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