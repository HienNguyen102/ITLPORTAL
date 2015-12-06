app.controller('ListContractCtrl', function ($scope, $ionicLoading, UserService, ContractService, $ionicFilterBar) {
    $ionicLoading.show({
        templateUrl: 'templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    ContractService.getContractList(function (result) {
        $scope.contractList = result.entry_list;
        $ionicLoading.hide();
    });
    var fbInstance;
    $scope.showFilterBarContract = function () {
        fbInstance = $ionicFilterBar.show({
            items: $scope.contractList,
            update: function (filteredItems, filterText) {
                $scope.contractList = filteredItems;
                if (filterText) {
                }
            }
        });
    };
});
app.controller('ViewContractCtrl', function ($scope, ContractService, $stateParams, $ionicLoading) {
    $ionicLoading.show({
        templateUrl: 'templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    ContractService.getContractById($stateParams.id, function (result) {
        $ionicLoading.hide();
        $scope.contract = result;
    });

});