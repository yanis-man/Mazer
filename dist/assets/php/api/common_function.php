<?php

include_once('../database.php');

function initDB()
{
    $db = new Database();
    return $db;
}

function sendAndEx($SQL)
{
    $db = initDB();
    $result = $db->pull($SQL, array());

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

?>