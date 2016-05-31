<?php
require './db_connect.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

//echo 'I am from php'.$request->issueName;
if($request->op == 'create'){
    $sql = "insert into tasklist(date, issueName, time, done) VALUES('$request->date', '$request->issueName', '$request->time', 0)";
}
else if($request->op == 'delete'){
    $sql = "delete from tasklist where mIndex = ".$request->mIndex;
}
else if($request->op == 'update'){
    $sql = "update tasklist set done=1 WHERE mIndex = '$request->mIndex'";
}
    if ($con->query($sql) === TRUE) {
        echo 'success';
    }
     else {
        echo 'err:'.$con->error;
    }
?>