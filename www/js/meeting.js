// Tao webservice cho meeting : cac phuong thuc bao gom getMeetingList, getMeetingById, sendMeeting
app.service('MeetingService', function(){
    this.getMeetingList = function(sessionId, accountId, callback) {
        var meetingParams = {
            session: sessionId,
            module_name: "Meetings",
            query: "meetings.parent_id ='"+ accountId + "'",
            deleted: 0
        };
        
        meetingParams = JSON.stringify(meetingParams);
        $.ajax({
            type: "POST",
            url: apiUrl,
            data: {
                method : "get_entry_list",
                input_type: "JSON",
                response_type: "JSON",
                rest_data: meetingParams,
            },
            dataType: "json",
            success: function(response) {
                callback(respone);
            }
        });
    
    this.getMeetingById = function(sessionId, meetingId) {
        
    }
    
    this.sendMeeting = function(sesssionId, meetingData) {
        
    }
});