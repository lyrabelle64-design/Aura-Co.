<?php
include "db.php";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];
    $sql = "INSERT INTO contact_messages (name, email, subject, message)
            VALUES ('$name', '$email', '$subject', '$message')";
        if (mysqli_query($conn, $sql)) {
            echo "success";
        } 
        else {
            echo "error";
        }
    }
?>