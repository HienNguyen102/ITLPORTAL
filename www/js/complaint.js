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
                angular.forEach(response.entry_list, function (item_arr) {
                    console.log(item_arr);
                });
                callback(response);
            }
        });
    }

    this.getComplaintById = function (sessionId, complaintId, callback) {
        var caseParams = {
            session: sessionId,
            module_name: "Cases",
            id: complaintId,
            select_fields: ['id', 'case_number', 'name', 'description', 'status', 'priority', 'date_entered'],
            link_name_to_fields_array: [
                /*{
                    name: 'c_booking_cases_1',
                    value: ['name', 'trucking_booking_code']
                }, */{
                    name: 'notes',
                    value: ['id', 'name', 'description', 'created_by_name', 'date_entered', 'filename']
                }
            ]
        }

        caseParams = JSON.stringify(caseParams);
        //debugger;
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
                //debugger;
                callback(response.entry_list[0].name_value_list,response.relationship_list[0]);
            }
        });
    }
    this.closeComplaint = function (sessionId, complaintId) {
        //console.log("close complaint function");
        debugger;
        var caseParams = {
            session: sessionId,
            module_name: "Cases",
            name_value_list: {
                id: complaintId,
                status: 'Closed'
            }
        }
        caseParams = JSON.stringify(caseParams);
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "set_entry",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: caseParams,
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
                debugger;
            }
        });
    }

    this.sendMeeting = function (sesssionId, meetingData) {

    }
});