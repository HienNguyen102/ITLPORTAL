// Tao webservice cho meeting : cac phuong thuc bao gom getMeetingList, getMeetingById, sendMeeting
app.service('MeetingService', function(){
    this.getMeetingList = function(sessionId, callback) {
        var meetingsParams = {
            session: sessionId,
            module_name: "Meetings",
            //query: "meetings.parent_id ='"+ accountId + "'",
            //deleted: 0
        };
        
        meetingsParams = JSON.stringify(meetingsParams);
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method : "get_entry_list",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: meetingsParams,
            },
            dataType: "json",
            success: function(response) {
                callback(response);
            }
        });
    }
    
    this.getMeetingById = function(sessionId, meetingId, callback) {
        var meetingParams = {
            session: sessionId,
            module_name: "Meetings",
            id: meetingId
        }
        
        meetingParams = JSON.stringify(meetingParams);
        
         $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method : "get_entry",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: meetingParams,
            },
            dataType: "json",
            success: function(response) {
                callback(response.entry_list[0].name_value_list);
            }
        });
    }
    
    this.sendMeeting = function(sesssionId, meetingData) {
        
    }
});