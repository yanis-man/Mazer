import User from './Models/User.js'
import {get_url} from './utils.js'

import {ApiURL} from '../CONFIG.js'

$(function()
{
    let doEmployeeAttributionHided = true;
    $('#employeesList').hide();
    $("#setReccurrentTransaction").hide();

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
            $('#employeesList').show();
            doEmployeeAttributionHided = false
        }
        else
        {
            $('#employeesList').hide();
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
            new Option(employee['display_name'], employee['id'])
        )
        $("#roleEmployeeList").append(
            new Option(employee['display_name'], employee['id'])
        )

    })

    let roleList = get_url(ApiURL.COMMON_URL, "action=getRoleList")['data'];

    roleList.forEach(role => {
        $("#roleList").append(
            new Option(role['display_name'], role['id'])
        )

    })

    //Script to display transaction types in shortcuts
    let transactionType = get_url(ApiURL.COMMON_URL, "action=getTransactionTypes")['data'];

    transactionType.forEach(transaction => {
        $("#transactionTypeList").append(
            new Option(transaction['display_name'], transaction['id'])
        )
    })

    //Listen on employee switch in roles tab
    $("#roleEmployeeList").on('change', function(e){
        let value = $("#roleEmployeeList :selected").val()
        if(value == 0)
        {
            return;
        }
        let role = get_url(ApiURL.COMMON_URL, "action=getUserRoles&userId="+value)['data'][0]['compagny_role_dsp'];
        $("#actual-role").attr("placeholder", role);
    })

    //Listen on transaction type to show or not the reccurent selector
    $("#transactionTypeList").on('change', function(e)
    {
        let value = $("#transactionTypeList :selected").val()
        console.log(value)
        if(value == 0 || value == 1)
        {
            $("#setReccurrentTransaction").hide()
            return
        }
        else
        {
            $("#setReccurrentTransaction").show()
        }
    })
})