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
 .controller('LoginCtrl', function($scope, $ionicLoading, UserService) {
    $scope.login = function(data) {
         $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
        var sessionId = "";
//        debugger;
        UserService.login(data.user_name, data.password, function(result){
             $ionicLoading.hide();
            alert(result.id);
        });
    }
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
 });