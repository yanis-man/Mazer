import {get_url} from '../utils'
import { replace } from "../../js-mustache";
import Modal from "../Models/Modal/Modal";
import {Notification, NotificationTypes} from '../Notifications/Notifications'


import { ApiURL } from "../../CONFIG";

class RunManager
{
    constructor(document)
    {
        this.doc = document
    }
    async displayWaitingRuns()
    {
        const waitingRuns = get_url(ApiURL.COMMON_URL, "action=retrieveWaitingRuns")['data'];
        const destination = this.doc.getElementById("waitingRunsTableBody");
        if(waitingRuns.length > 0)
        {
            destination.innerHTML = ""
        }
        let runData = {}
        for(let i = 0; i< waitingRuns.length ; i++)
        {
            runData = {
                run_id:waitingRuns[i]['run_id'],
                driver_name:waitingRuns[i]['driver_name'],
                amount:waitingRuns[i]['amount'],
                date:waitingRuns[i]['date']
            }
            console.log(runData)
            this.doc.getElementById("waitingRunsTableBody").innerHTML += (await replace('./assets/templates/Run.html', runData))

        let proofmodal = new Modal(this.doc, "modal-destination","Preuve du trajet");
        proofmodal.updateId(`run${waitingRuns[i]['run_id']}`)
        proofmodal.addImage(waitingRuns[i]['proof'])
        proofmodal.display()
        
        //Generate modal for run's details
        let detailsModal = new Modal(this.doc, "modal-destination", "Détails du trajet");
        detailsModal.updateId(`details${waitingRuns[i]['run_id']}`)
        detailsModal.addText(
            '<strong>Informations du véhicule</strong><br/>'+
            `Type : ${waitingRuns[i]['vehicle_name']} <br/>`+
            `Plaque : ${waitingRuns[i]['plate']} <br>`+
            '<strong>Commentaire</strong><br/>'+
            `${(waitingRuns[i]['comment'] ? waitingRuns[i]['comment'] : "Aucun")} <br/>`+
            `<strong>Lié à la semaine n°${waitingRuns[i]['week_num']}</strong><br/>`
            )
        detailsModal.display()
        }
    }

    acceptRun(runId)
    {
        const result = get_url(ApiURL.COMMON_URL, `newStatus=1&runId=${runId}&action=updateRunStatus`)['status'];
        if(result == "ok")
        {
            new Notification("Le trajet a été validé", new NotificationTypes().Success)
            $("#waitingRunsTableBody").children(`#${runId}`).remove()

        }
    }
    rejectRun(runId)
    {
        let comValue = $("#rejectionCom").val()
        if(comValue.length != 0)
        {
            const isRejectionOK = get_url(ApiURL.COMMON_URL, `newStatus=2&runId=${runId}&rejectionCom=${comValue}&action=updateRunStatus`);
            if(isRejectionOK['status'] == "ok")
            {
                new Notification(`Trajet n°${runId} refusé`, new NotificationTypes().Success)
                $("#waitingRunsTableBody").children(`#${runId}`).remove()
            }
            else
            {
                new Notification("Une erreur est survenue", new NotificationTypes().Error)
            }
            $("#rejectionCom").val("")
        }
    }
}

export {RunManager}