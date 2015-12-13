app.service('UserService', function () {
    this.login = function (userName, password, callback) {
        var loginParams = {
            user_auth: {
                user_name: userName,
                password: password,
                encryption: 'PLAIN'
            }
        };
        loginParams = JSON.stringify(loginParams);
        $.ajax({
            url: apiUrl,
            type: "POST",
            data: {
                method: "login",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: loginParams,
            },
            dataType: "json",
            success: function (response) {
                callback(response);
            }
        });
    }
    this.getUserInfo = function (sessionId, userId, callback) {
        var userParams = {
            session: sessionId,
            user_id: userId
        };
        userParams = JSON.stringify(userParams);
        $.ajax({
            url: apiUrl,
            type: "POST",
            data: {
                method: "get_user_info",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: userParams,
            },
            dataType: "json",
            success: function (response) {
                callback(response);
            }
        });
    }
    this.autoLogin = function (callback) {
        var dataLogin = JSON.parse(localStorage.getItem('dataLogin'));
        var username = dataLogin.username;
        var password = dataLogin.password;
        this.login(username, password, function(response){
            callback(response);
        });
    }
    this.updateProfile = function (data, callback) {
        debugger;
        var sessionId = JSON.parse(localStorage.getItem('data')).sessionId;
        var userInfo = JSON.parse(JSON.parse(localStorage.getItem('data')).userInfo);
        var accountId = userInfo.id
        var userParams = {
            session: sessionId,
            module_name: "Accounts",
            name_value_list: [
                {name: "id", value: accountId},
                {name: "name", value: data.name},
                {name: "phone_office", value: data.phone_office},
                {name: "email1", value: data.email},
                {name: "billing_address_street", value: data.billing_address_street},
                {name: "tax_code", value: data.tax_code}
            ]
        };
        userParams = JSON.stringify(userParams);
        $.ajax({
            url: apiUrl,
            type: "POST",
            data: {
                method: "set_entry",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: userParams,
            },
            dataType: "json",
            success: function (response) {
                callback(response.entry_list.id.value);
            }
        });
    }
});