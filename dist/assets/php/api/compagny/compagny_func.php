<?php

require('../../database.php');

function initDB()
{
    $db = new Database();
    return $db;
}

function sendData($data)
{
    header('Content-Type: application/json');
    echo json_encode(['status'=> 'ok', 'data'=>$data]);
    return;
}


function retrieveCompInfos()
{
    $db = initDB();
    $data = [];

    //Compute turn-over 
    $SQL = "SELECT SUM(amount)*15 AS total_to FROM runs";
    $data[0] = $db->pull($SQL, array());

    //Request grade rate
    $SQL = "SELECT * FROM compagny_roles";
    $data[1] = $db->pull($SQL, array());
    array_merge($data[0], $data[1]);
    sendData($data);
}

?>