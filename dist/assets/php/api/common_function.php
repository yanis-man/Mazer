<?php

include_once('../database.php');

function initDB()
{
    $db = new Database();
    return $db;
}

function returnDate()
{
    return strval(date('d/m/y'));
}

function returnWeekNum()
{
    return date("W");
}

/*
TYPE
- False : Pull from the db
- True : Push to the db
*/

function sendAndEx($SQL, $params = array(), $type = false)
{
    $db = initDB();

    if($type)
    {
        $params = $db->sanitize($params);
        $db->push($SQL, $params);

        header('Content-Type: application/json');
        echo json_encode(['status'=> 'ok']);
        return;
    }

    $result = $db->pull($SQL, $params);

    header('Content-Type: application/json');
    $result = $result;

    echo json_encode(['status'=>'ok', 'data'=>$result]);
}

function retrieveVehiclesType()
{
    $SQL = "SELECT * FROM vehicles_types";

    sendAndEx($SQL);
}

function retrieveEmployeeList()
{
    $SQL = "SELECT users.id, users.display_name FROM users";

    sendAndEx($SQL);
}

function retrieveUserRole($id)
{
    $SQL = "SELECT 
    users.global_role, users.compagny_role,
    compagny_roles.display_name AS compagny_role_dsp,
    global_roles.display_name AS global_role_dsp
    FROM users
    INNER JOIN compagny_roles ON compagny_roles.id = users.compagny_role
    INNER JOIN global_roles ON global_roles.id = users.global_role
    WHERE users.id=?";

    sendAndEx($SQL, array($id));
}

function retrieveRoleList()
{
    $SQL = "SELECT * FROM compagny_roles;";

    sendAndEx($SQL);
}

function retrieveTransactionTypes()
{
    $SQL = "SELECT * FROM transaction_types";
    sendAndEx($SQL);
}

function registerNewVehicle($data)
{
    $SQL = "INSERT INTO vehicles
    (vehicles.plate, vehicles.type, vehicles.driver)
    VALUES
    (?, ?, ?)";
    if(!isset($data['setToAnEmployee']))
    {
        $data['employeeList'] = null;
    }
    sendAndEx($SQL, array($data['vehiclePlate'], $data['vehicleType'], $data['employeeList']), true);
    return;
}

function updateUserRole($data)
{
    $SQL = "UPDATE users
    SET users.compagny_role = ?
    WHERE users.id = ?";

    sendAndEx($SQL, array($data['roleSelected'], $data['employeeSelected']));
}

function registerNewTransaction($data)
{
    $date = returnDate();
    $week = returnWeekNum();
    if(!isset($data['setAsRecurrent']))
    {
        $SQL = "INSERT INTO transactions
        (transactions.destination, transactions.amount, transactions.label, transactions.type, transactions.registering_date, transactions.week_num)
        VALUES
        (?,?,?,?,?,?)";

        sendAndEx($SQL, array($data['destination'], $data['amount'], $data['label'], $data['transactionType'], $date, $week), true);
    }
    else
    {
        $SQL = "INSERT INTO recurrent_bill
        (recurrent_bill.type, recurrent_bill.amount, recurrent_bill.registering_date, recurrent_bill.comment)
        VALUES
        (?, ?, ?, ?);";

        sendAndEx($SQL, array($data['transactionType'], $data['amount'], $date, $data['label']), true);
    }
}

function retrieveWaitingRuns()
{
    $SQL = " SELECT 
    runs.id AS run_id, 
    runs.driver, runs.date, runs.vehicle, runs.amount, runs.proof, runs.state, runs.comment, runs.week_num,

    users.display_name AS driver_name, 

    vehicles.plate,

    vehicles_types.display_name AS vehicle_name
    FROM runs

    INNER JOIN users ON users.id = runs.driver
    INNER JOIN vehicles ON vehicles.id = runs.vehicle 
    INNER JOIN vehicles_types ON vehicles_types.id = vehicle

    WHERE runs.state = 3;
    ";

    sendAndEx($SQL);
}

function retrieveTransacHist()
{
    $SQL = "SELECT * FROM transactions";
    sendAndEx($SQL);
}

function updateRunStatus($data)
{
    if(!isset($data['rejectionCom']))
    {
        $data['rejectionCom'] = null;
    }
    $SQL = "UPDATE runs SET runs.state = ?, runs.verification_comment = ? WHERE runs.id = ?";
    $params = array(
        $data['newStatus'],
        $data['rejectionCom'], 
        $data['runId']
    );
    sendAndEx($SQL, $params);
}
?>