app.controller('ListCallCtrl', function ($scope, $ionicLoading, UserService, CallService, $ionicFilterBar) {
    $ionicLoading.show({
        templateUrl: 'templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    CallService.getCallList(function (result) {
        $scope.callList = result.entry_list;
        $ionicLoading.hide();
    });
    var fbInstance;
    $scope.showFilterBarCall = function () {
        fbInstance = $ionicFilterBar.show({
            items: $scope.callList,
            update: function (filteredItems, filterText) {
                $scope.callList = filteredItems;
                if (filterText) {
                    //console.log(filterText);
                }
            }
        });
    };
});
app.controller('ViewCallCtrl', function ($scope, CallService, $stateParams, $ionicLoading) {
    $ionicLoading.show({
        templateUrl: 'templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    CallService.getCallById($stateParams.id, function (result) {
        $ionicLoading.hide();
        $scope.call = result;
    });

});
app.controller('CreateCallCtrl', function ($scope, $ionicLoading, $filter, $location, CallService) {
    // Set datetimepicker
    $scope.datepickerObjForCallDate = {
        titleLabel: 'Chọn ngày',
        todayLabel: 'Hôm nay',
        closeLabel: 'Đóng',
        setLabel: 'OK',
        setButtonType: 'button-assertive',
        todayButtonType: 'button-assertive',
        closeButtonType: 'button-assertive',
        inputDate: new Date(), //Optional
        mondayFirst: true, //Optional
        templateType: 'popup', //Optional
        modalHeaderColor: 'bar-positive',
        modalFooterColor: 'bar-positive',
        from: new Date(2012, 8, 2),
        to: new Date(2018, 8, 25),
        callback: function (val) {
            datePickerCallback(val);
        }
    };
    var datePickerCallback = function (val) {
        if (typeof (val) === 'undefined') {
            console.log('No date selected');
        } else {
            $scope.datepickerObjForCallDate.inputDate = $filter('date')(val, 'yyyy-MM-dd');
            //var temp=$filter('date')($scope.datepickerObjForCallDate.inputDate, 'yyyy-MM-dd');
            //debugger;
        }
    };
    $scope.sendCall = function (data) {
        data.start_date = '31/10/2015 05:45pm';
        $ionicLoading.show({
            templateUrl: 'templates/loading.html',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        data.date_start = $scope.datepickerObjForCallDate.inputDate;
        CallService.sendCallInService(data, function (result) {
            $ionicLoading.hide();
            $scope.closeAddCallModal();
            if (result.id != '') {
                $location.path('main/menu/view_call/' + result.id);
            }
        });
    }
});