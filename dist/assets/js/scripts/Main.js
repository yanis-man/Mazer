import User from './Models/User.js'
import {get_url} from './utils.js'

import {ApiURL} from '../CONFIG.js'

$(function()
{
    let doEmployeeAttributionHided = true;
    $('#employeeList').hide();
    const userToken = localStorage.getItem('authToken');
    if(userToken)
    {
        const data = get_url(ApiURL.AUTH_URL, "userAuthToken="+userToken+"&action=get_user_info")

        document.User = new User(data);
        document.User.update_display(document);
    }
    $("#setToAnEmployee").on('change', function(e)
    {
        if(doEmployeeAttributionHided)
        {
            $('#employeeList').show();
            doEmployeeAttributionHided = false
        }
        else
        {
            $('#employeeList').hide();
            doEmployeeAttributionHided = true
        }
    })

    //Script to display vehicles types
    let vehiclesTypes = get_url(ApiURL.COMMON_URL, "action=getVehiclesTypes")['data'];

    vehiclesTypes.forEach(type => {
        $("#vehicleType").append(
            new Option(type['display_name'], type['id'])
        )
    });

    //Script to display employee in shortcuts
    let employeeList = get_url(ApiURL.COMMON_URL, "action=getEmployeeList")['data'];

    employeeList.forEach(employee => {
        $("#employeeList").append(
            new Option(employee['id'], employee['display_name'])
        )
    })
})