<?php
include_once('./common_function.php');
    if(isset($_POST))
    {
        if(isset($_POST['action']))
        {
            $action = $_POST['action'];
            switch($action)
            {
                case "getVehiclesTypes":
                    retrieveVehiclesType();
                    break;
                case "getEmployeeList":
                    retrieveEmployeeList();
                    break;
                case "getUserRoles":
                    retrieveUserRole($_POST['userId']);
                    break;
                case "getRoleList":
                    retrieveRoleList();
                    break;
                case "getTransactionTypes":
                    retrieveTransactionTypes();
                    break;
                case "registerVehicle":
                    registerNewVehicle($_POST);
                    break;
                case "editRole":
                    updateUserRole($_POST);
                    break;
                case "registerNewTransaction":
                    registerNewTransaction($_POST);
                    break;
            }
        }
    }
?>