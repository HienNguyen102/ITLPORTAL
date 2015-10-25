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
    this.getUserInfo = function (userId, callback) {
        var rootSession;
        this.login(rootUser, rootPass, function(response){
            debugger;
            rootSession = response.id;
            var userParams = {
                session: rootSession,
                module_name: "Users",
                id: userId,
                select_fields: ["name","account_id"]
            };
            userParams = JSON.stringify(userParams);
            $.ajax({
                url : apiUrl,
                type : "POST",
                data : {
                    method : "get_entry",
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
        });
    }
});