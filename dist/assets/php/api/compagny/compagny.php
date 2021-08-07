<?php
include_once('./compagny_func.php');
    if(isset($_POST))
    {
        if(isset($_POST['action']))
        {
            $action = $_POST['action'];
            switch($action)
            {
                case "retrieveData":
                    retrieveCompInfos();
                    break;
            }
        }
    }
?>