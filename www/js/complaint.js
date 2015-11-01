// Tao webservice cho complaint : cac phuong thuc bao gom get ComplaintList
app.service('ComplaintService', function () {
    this.getComplaintList = function (sessionId, userId, callback) {
        var complaintParams = {
            session: sessionId,
            module_name: "Cases",
            query: "cases.created_by ='" + userId + "'"
                //deleted: 0
        };

        complaintParams = JSON.stringify(complaintParams);
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "get_entry_list",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: complaintParams,
            },
            dataType: "json",
            success: function (response) {
                callback(response);
            }
        });
    }

    this.getComplaintById = function (sessionId, complaintId, callback) {
        var caseParams = {
            session: sessionId,
            module_name: "Cases",
            id: complaintId
        }

        caseParams = JSON.stringify(caseParams);

        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "get_entry",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: caseParams,
            },
            dataType: "json",
            success: function (response) {
                //console.log(response);
                callback(response.entry_list[0].name_value_list);
            }
        });
    }

    this.sendMeeting = function (sesssionId, meetingData) {

    }
});