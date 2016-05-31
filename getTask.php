<?php
require './db_connect.php';

$taskList = mysqli_query($con,"SELECT * FROM `tasklist`");
$Taskarray = array();
    while($row =mysqli_fetch_assoc($taskList))
    {
//        $task = array();
//        echo $row['issueName'];
        $Taskarray[] = $row;
    }
    echo json_encode($Taskarray);
?>