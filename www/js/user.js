app.service('UserService', function() {
    this.login = function (userName, password, callback) {
        var loginParams = {
            user_auth: {
                user_name : userName,
                password : password,
                encryption : 'PLAIN'
            }
        };
        loginParams = JSON.stringify(loginParams);
        $.ajax({
            url : apiUrl,
            type : "POST",
            data : {
                method : "login",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: loginParams,
            },
            dataType: "json",
            success: function(response) {
                callback(response);
            }
        });
    }
});