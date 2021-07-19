<?php

include_once('../database.php');

function initDB()
{
    $db = new Database();
    return $db;
}

/*
TYPE
- 0 : Pull from the db
- 1 : Push to the db
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
    $SQL = "INSERT INTO transactions
    (transactions.destionation, transactions.amount, transactions.label, transactions.type)
    VALUES
    (?,?,?,?)";
    
    $SQL = "INSERT INTO recurrent_bill
    (recurrent_bill.type, recurrent_bill.amount, recurrent_bill.registering_date, recurrent_bill.comment)
    VALUES
    (?, ?, ?, ?);";
}
?>