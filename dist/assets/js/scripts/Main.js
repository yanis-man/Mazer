import User from './Models/User.js'
import Modal from './Models/Modal/Modal.js'
import {get_url, getNumberOfWeek} from './utils.js'

import { RunManager } from "./Runs/RunManager";

import {ApiURL} from '../CONFIG.js'

import {Notification, NotificationTypes} from './Notifications/Notifications.js'


$( window ).bind('beforeunload', function()
 {
   document.getElementById('modal-destination').innerHTML = ""
});


$(async function()
{
    //Useful variables
    let doEmployeeAttributionHided = true;
    $('#employeesList').hide();
    $("#setReccurrentTransaction").hide();

    //Run Manager
    window.RM = new RunManager(document);
    window.RM.displayWaitingRuns();

    //Generate a modal for the rejection function
    const rejectionModal = new Modal(document, "modal-destination", "Informations de rejet")
    rejectionModal.updateId("rejectionModal")
    rejectionModal.addText("Raisons du refus")
    rejectionModal.addFormField("rejectionCom", "text")
    rejectionModal.addAction("Valider", "validateReject")
    rejectionModal.display()

    $("#weekNum").html(getNumberOfWeek());

    const userToken = localStorage.getItem('authToken');
    if(userToken && !document.User)
    {
        const data = get_url(ApiURL.AUTH_URL, "userAuthToken="+userToken+"&action=get_user_info")

        document.User = new User(data);
        document.User.update_display(document);
    }
    else
    {
        //redirect to the login page
    }
    //detect if the radio is checked to display employee list
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

    //Shortcuts form treatement
    $("#registerNewVehicle").on('submit', function(e)
    {
        e.preventDefault();

        let newVehicleData = $(this).serialize();
        let vehicleName = $("#vehicleType :selected").text();

        const response = get_url(ApiURL.COMMON_URL, newVehicleData+"&action=registerVehicle");
        if(response['status'] == 'ok')
        {
            new Notification(`Votre ${vehicleName} a bien été enregistré`, new NotificationTypes().Success)
            $(this)[0].reset();
        }
    })

    $("#editRole").on('submit', function(e){
        e.preventDefault();

        const roleData = $(this).serialize();
        const response = get_url(ApiURL.COMMON_URL, roleData+"&action=editRole");
        if(response['status'] == 'ok')
        {
            new Notification(`Fait`, new NotificationTypes().Success)
            $(this)[0].reset();
        }
    })
    //Add a transaction to the history
    $("#registerTransaction").on('submit', function(e)
    {
        e.preventDefault();
        const transactionData = $(this).serialize();
        const response = get_url(ApiURL.COMMON_URL, transactionData+"&action=registerNewTransaction");
        if(response['status'] == 'ok')
        {
            new Notification(`Transaction ajoutée`, new NotificationTypes().Success)
            $(this)[0].reset();
        }
    })

    //Update the transactions history
    let last5Transac = get_url(ApiURL.COMMON_URL, "action=retrieveTransactionsHist")['data'].slice(0, 4)
    last5Transac.forEach(transac => {
        $("#last5transactions").append(
            `<tr> <td class="text-bold-500">${transac['destination']}</td>`+
            `<td class="text-bold-500">${(transac['type'] == "1" ? "+" : "-")+"$"+transac['amount']}</td>`+
            `<td class="text-bold-500">${transac['registering_date']}</td></tr>`
        )
    })

    $("tr #sendCorrectRun").on('click', function(e){
        const rowId = $(this).closest("tr").attr("id")

        const result = get_url(ApiURL.COMMON_URL, `newStatus=1&runId=${rowId}&action=updateRunStatus`)['status'];
        if(result == "ok")
        {
            new Notification("Le trajet a été validé", new NotificationTypes().Success)
            $(this).closest('tr').remove()

        }
    })

    $("#validateReject").on('click', function(e)
    {
        window.RM.rejectRun(window.rejectId)
    })


})