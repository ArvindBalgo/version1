<?php

require 'authFN.php';


$db = new DbHandler();
$session = $db->getSession();

$response["uid"] = $session['uid'];
$response["email"] = $session['email'];
$response["name"] = $session['name'];
$response["type"] = $session['admin'];
$response["admin"] = $session['admin'];
echoResponse(200, $session);
?>