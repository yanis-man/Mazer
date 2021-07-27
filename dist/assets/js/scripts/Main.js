import User from './Models/User.js'
import Modal from './Models/Modal/Modal.js'
import {get_url, getNumberOfWeek} from './utils.js'


import {ApiURL} from '../CONFIG.js'

import {Notification, NotificationTypes} from './Notifications/Notifications.js'

$(function()
{
    //Useful variables
    let doEmployeeAttributionHided = true;
    $('#employeesList').hide();
    $("#setReccurrentTransaction").hide();
        
    $("#weekNum").html(getNumberOfWeek());

    const userToken = localStorage.getItem('authToken');
    if(userToken)
    {
        const data = get_url(ApiURL.AUTH_URL, "userAuthToken="+userToken+"&action=get_user_info")

        document.User = new User(data);
        document.User.update_display(document);
    }
    else
    {
        //redirect to the login page
    }

    //Load all runs which needs to be validated
    const waitingRuns = get_url(ApiURL.COMMON_URL, "action=retrieveWaitingRuns")['data'];

    waitingRuns.forEach(run =>{
        $("#waitingRunsTable").append(
            `<tr id="${run['run_id']}">`+
                `<td>${run['run_id']}</td>`+
                `<td>${run['driver_name']}</td>`+
                `<td>${run['amount']}</td>`+
                `<td>${run['date']}</td>`+
                `<td>`+
                    `<button type="button" class="btn btn-outline-primary block" data-bs-toggle="modal" data-bs-target="#run${run['run_id']}" id="seeRunProofNDetails">`+
                        `<i class="fa fa-eye"></i>`+
                    `</button>`+
                `</td><td>`+
                    `<button class="btn btn-success btn-sm icon" id="sendCorrectRun"><i class="fa fa-check"></i></button>`+
                    `<button class="btn btn-danger btn-sm icon" id="rejectInvalidRun"><i class="fa fa-times"></i></button>`+
                `</td> <td>`+
                    `<button type="button" class="btn btn-outline-primary block" data-bs-toggle="modal" data-bs-target="#details${run['run_id']}" id="seeDetails">`+
                        `<i class="fa fa-eye"></i>`+
                    `</button>`+
                `</td></tr>`
        )
        //Generating modal used to display the run's proof.
        let proofmodal = new Modal(document, "modal-destination","Preuve du trajet");
        proofmodal.updateId(`run${run['run_id']}`)
        proofmodal.addImage(run['proof'])
        proofmodal.display()
        
        //Generate modal for run's details
        let detailsModal = new Modal(document, "modal-destination", "Détails du trajet");
        detailsModal.updateId(`details${run['run_id']}`)
        detailsModal.addText(
            '<strong>Informations du véhicule</strong><br/>'+
            `Type : ${run['vehicle_name']} <br/>`+
            `Plaque : ${run['plate']} <br>`+
            '<strong>Commentaire</strong><br/>'+
            `${(run['comment'] ? run['comment'] : "Aucun")} <br/>`+
            `<strong>Lié à la semaine n°${run['week_num']}</strong><br/>`
            )
        detailsModal.display()
    })
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
            new Notification("Le trajet a été valdié", new NotificationTypes().Success)
            $(this).closest('tr').remove()

        }
    })
    $("tr #sendCorrectRun").on('click', function(e){
        const rowId = $(this).closest("tr").attr("id")

        //get_url(ApiURL.COMMON_URL, `newStatus=1&runId=${rowId}&action=updateRunStatus`);
    })


})