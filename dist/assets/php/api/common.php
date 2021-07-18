<?php
include_once('./common_function.php');
    if(isset($_POST))
    {
        if(isset($_POST['action']))
        {
            $action = $_POST['action'];
            if($action == 'getVehiclesTypes')
            {
                retrieveVehiclesType();
            }
            if($action == 'getEmployeeList')
            {
                retrieveEmployeeList();
            }
            if($action == "getUserRoles")
            {
                retrieveUserRole($_POST['userId']);
            }
            if($action == "getRoleList")
            {
                retrieveRoleList();
            }
        }
    }
?>