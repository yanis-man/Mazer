<?php
    include_once('../database.php');

    function initDb()
    {
        $db = new Database();
        return $db;
    }

    function authUser($userId, $userPass)
    {
        $db = initDb();
        $SQL = "SELECT 
        users.id, users.password
        FROM users
        WHERE users.login=?;";

        /*$userId = $db->sanitize($userId);
        $userPass = $db->sanitize($userPass);*/

        $result = $db->pull($SQL, array($userId));
        $hashed_password = $db->hasher($userPass);

        if($result)
        {
            header('Content-Type: application/json');
            $result = $result['0'];

            if($result['password'] == $hashed_password)
            {

                sendData(['status' => "ok", 'token' => $result['id']]);
            }
            else
            {
                echo json_encode(['error' => "error"]);
            }
        }
        else
        {
            echo json_encode(["status"=>$result]);
        }
        $db = null;
    }

    function retrieveUserInfo($userToken)
    {
        $db = new Database();
        $SQL = "SELECT 
                users.id, users.display_name, users.global_role, users.compagny_role, users.login, users.password, users.compagny_id, 
                global_roles.display_name AS global_role_dsp, 
                compagny_roles.display_name AS compagny_role_dsp,
                compagny.display_name AS compagny_name_dsp 
                FROM users 
                INNER JOIN global_roles ON global_roles.id = users.global_role 
                INNER JOIN compagny_roles ON compagny_roles.id = users.compagny_role 
                INNER JOIN compagny ON compagny.id = users.compagny_id 
                WHERE users.id=?;";

        if($userToken != " ")
        {
            $result = $db->pull($SQL, array($userToken));

            if($result)
            {
                header('Content-Type: application/json');
                $result = $result['0'];

                sendData(['status' => "ok", "data"=>$result]);
                }
            else
            {
                    echo json_encode(['error' => "error"]);
            }
            }
        else
        {
                echo json_encode(["status"=>"no result"]);
        }
    }
?>