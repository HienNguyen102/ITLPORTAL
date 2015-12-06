app.controller('CreateBookingCtrl', function($scope){
    // Set datetimepicker for booking date
    $scope.bookingDateObject = {
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
            bookingDateCallback(val);
        }
    };
    var bookingDateCallback = function (val) {
        if (typeof (val) === 'undefined') {
            console.log('No date selected');
        } else {
            $scope.bookingDateObject.inputDate = val;
        }
    };
    // Set datetimepicker for booking date
    $scope.dateOfShipmentObject = {
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
            dateOfShipmentCallback(val);
        }
    };
    var dateOfShipmentCallback = function (val) {
        if (typeof (val) === 'undefined') {
            console.log('No date selected');
        } else {
            $scope.dateOfShipmentObject.inputDate = val;
        }
    };
     // Set datetimepicker for booking date
    $scope.dateReceiptObject = {
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
            dateReceiptCallback(val);
        }
    };
    var dateReceiptCallback = function (val) {
        if (typeof (val) === 'undefined') {
            console.log('No date selected');
        } else {
            $scope.dateReceiptObject.inputDate = val;
        }
    };
     // Set datetimepicker for booking date
    $scope.datePackingObject = {
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
            datePackingCallback(val);
        }
    };
    var datePackingCallback = function (val) {
        if (typeof (val) === 'undefined') {
            console.log('No date selected');
        } else {
            $scope.datePackingObject.inputDate = val;
        }
    };
    
    
     // Set datetimepicker for booking date
    $scope.dateEndObject = {
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
            dateEndCallback(val);
        }
    };
    var dateEndCallback = function (val) {
        if (typeof (val) === 'undefined') {
            console.log('No date selected');
        } else {
            $scope.dateEndObject.inputDate = val;
        }
    };
});