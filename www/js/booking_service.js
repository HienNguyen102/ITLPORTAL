app.service('BookingService', function(){
    this.createBooking = function(sessionId, data, callback) {
        var bookingParams = {
            session: sessionId,
            module_name: "C_Booking",
            name_value_list: [
                {name: "truck_booking_account_code", value: data.truck_booking_account_code},
                {name: "assigned_user_id", value: data.assigned_user_id},
                {name: "truck_booking_date", value: data.truck_booking_date},
                {name: "truck_tax_code", value: data.truck_tax_code},
                {name: "trucking_quote_id", value: data.trucking_quote_id},
                {name: "trucking_route_id", value: data.trucking_route_id},
                {name: "truck_port_from", value: data.truck_port_from},
                {name: "truck_port_to", value: data.truck_port_to},
                {name: "truck_transfer_type", value: data.truck_transfer_type},
                {name: "truck_unit", value: data.truck_unit},
                {name: "truck_weight", value: data.truck_weight},
                {name: "truck_commodity", value: data.truck_commodity},
                {name: "truck_quantity", value: data.truck_quantity},
                {name: "truck_position_receipt", value: data.truck_position_receipt},
                {name: "truck_position_packing", value: data.truck_position_packing},
                {name: "truck_position_delivery", value: data.truck_position_delivery},
                {name: "truck_status", value: data.truck_status},
                {name: "trucking_broker_id", value: data.trucking_broker_id},
                {name: "truck_sale_source", value: data.truck_sale_source},
                {name: "trucking_branch_id", value: data.trucking_branch_id},
                {name: "trucking_is_quotation_rent", value: data.trucking_is_quotation_rent},
                {name: "trucking_check_trial", value: data.trucking_check_trial},
                {name: "trucking_check_merge", value: data.trucking_check_merge},
                {name: "trucking_supplier_id", value: data.trucking_supplier_id},
                {name: "trucking_ops_id", value: data.trucking_ops_id},
                {name: "c_booking_accountsaccounts_ida", value: data.account_id},
            ]
        };
        
        bookingParams = JSON.stringify($bookingParams);
        
        if(data.contact_id != '') {
            var contactParams = {
                session: sessionId,
                module_name: "Contacts",
                module_id: data.contact_id,
                link_field_name: "c_booking_contacts",
                related_ids: [bookingId],
            };
            
            contactParams = JSON.stringify($contactParams);
        }
        
        var bookingDetailParams = {
            session: sessionId,
            module_name: "C_BookingDetailRequirement",
            name_value_list: [
                {name: 'delivery_date', value: data.delivery_date},
                {name: 'quantity', value: data.quantity},
                {name: 'remain', value: data.remain},
                {name: 'receipt_date', value: data.receipt_date},
                {name: 'date_packing_or_unload', value: data.date_packing_or_unload},
                {name: 'end_date', value: data.end_date},  
            ]
            
        }
        
        bookingDetailParams = JSON.stringify($bookingDetailParams);
        
        var setRelationshipBookingDetailAndBooking = {
            session: sessionId,
            module_name: "C_Booking",
            module_id: bookingId,
            link_field_name: "c_booking_c_bookingdetailrequirement_1",
            related_ids: [bookingDetailId],
        };
        
        setRelationshipBookingDetailAndBooking = JSON.stringify(setRelationshipBookingDetailAndBooking);
    }
});