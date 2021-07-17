<?php
session_start();

include_once('../database.php');
include_once('./auth_functions.php');  


if(isset($_POST))
{   
    $db = new Database();

    function sendData($data)
    {
        echo json_encode($data);
    }

    if($_POST['action'] == "get_user_info")
    {
        retrieveUserInfo($_POST['userAuthToken']);
    }

    if($_POST['action'] == "user_auth")
    {
        authUser($_POST['userId'], $_POST['userPassword']);
    }
}
?>