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
                console.log(response);
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
                url : apiUrl,
                type : "POST",
                data : {
                    method : "get_user_info",
                    input_type: "JSON",
                    response_type: "JSON",
                    rest_data: userParams,
                },
                dataType: "json",
                success: function(response) {
                    debugger;
                    callback(response);
                }
            });
    }
});