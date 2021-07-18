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

function sendAndEx($SQL, $params = array(), $type = 0)
{
    $db = initDB();

    if($type)
    {
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

function addVehicle($_POST)
{
    
}
?>