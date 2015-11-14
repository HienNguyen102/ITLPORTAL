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
                    //console.log(item_arr);
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
                {
                    name: 'c_booking_cases_1',
                    value: ['name', 'trucking_booking_code']
                },
                {
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
                callback(response.entry_list[0].name_value_list, response.relationship_list[0]);
            }
        });
    }
    this.closeComplaint = function (sessionId, complaintId) {
        /*debugger;
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
        });*/

    }
    this.readFileInService = function ($scope) {
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            alert('The File APIs are not fully supported in this browser.');
            return;
        }
        input = document.getElementById('fileInput');
        if (!input) {
            alert("Um, couldn't find the fileinput element.");
        } else if (!input.files) {
            alert("This browser doesn't seem to support the `files` property of file inputs.");
        } else if (!input.files[0]) {
            alert("Please select a file before clicking 'Load'");
        } else {
            file = input.files[0];
            fr = new FileReader();
            fr.onload = function (event) {
                //debugger;
                $('#blah').attr('src', event.target.result);
                $scope.srcSelectedImage=event.target.result;
                $scope.test_thoi="test_thoi";
            }
        };

        //fr.readAsText(file);
        fr.readAsDataURL(file);
    }

    function receivedText(FR) {
        //document.getElementById('editor').appendChild(document.createTextNode(fr.result));
        debugger;
    }
    /*$("#fileInput").change(function(){
        //readURL(this);
        console.log("Da chon");
        debugger;
    });*/
    this.sendCommentInService = function (sessionId, userId, data, caseId) {
        var noteParams = {
            session: sessionId,
            module_name: "Notes",
            name_value_list: {
                name: 'Comment',
                description: data,
                parent_type: 'Cases',
                parent_id: caseId,
                assigned_user_id: userId
            }
        }
        noteParams = JSON.stringify(noteParams);
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method: "set_entry",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: noteParams,
            },
            dataType: "json",
            success: function (response) {
                //console.log(response);
                var new_note_id = response.id;
                //var file = document.getElementById("fileForUpload").files[0];
                //for file
                if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
                    alert('The File APIs are not fully supported in this browser.');
                    return;
                }
                var dataEncode;
                input = document.getElementById('fileInput');
                if (!input) {
                    alert("Um, couldn't find the fileinput element.");
                } else if (!input.files) {
                    alert("This browser doesn't seem to support the `files` property of file inputs.");
                } else if (!input.files[0]) {
                    alert("Please select a file before clicking 'Load'");
                } else {
                    file = input.files[0];
                    fr = new FileReader();
                    //fr.onload = receivedText(fr);
                    fr.onload = function (event) {
                        /*object = {};
                        object.filename = file.name;
                        object.data = event.target.result;
                        files.push(object);*/
                        $('#blah').attr('src', e.target.result);
                        dataEncode = event.target.result;
                        //}
                        //for file
                        var f = dataEncode;
                        //debugger;
                        var para_set_not_att = {
                            session: sessionId,
                            note: {
                                id: new_note_id,
                                filename: 'test.png',
                                file: f
                            }
                        };
                        var json_set_note_attachment = JSON.stringify(para_set_not_att);
                        $.ajax({
                            url: apiUrl,
                            type: "POST",
                            data: {
                                method: "set_note_attachment",
                                input_type: "JSON",
                                response_type: "JSON",
                                rest_data: json_set_note_attachment
                            },
                            dataType: "json",
                            success: function (response) {
                                debugger;
                                console.log(response);
                            },
                            error: function (response) {
                                debugger;
                                alert("err");
                            }
                        });
                    }
                };

                //fr.readAsText(file);
                fr.readAsDataURL(file);
            },
            error: function () {
                alert('Set note error');
            }
        });
    }



    this.sendMeeting = function (sesssionId, meetingData) {

    }
});