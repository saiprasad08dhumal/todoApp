<?php

$servername6213 = "localhost";
//$username6213 = "saiprasad322";
//$password6213 = "saiprasad322";

$username6213 = "root";
$password6213 = "";
$dbname6213 = "todolist";

// Create connection
$con = new mysqli($servername6213, $username6213, $password6213, $dbname6213);

// Check connection
if ($con->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
else{
//    echo 'connected';
}

?>
