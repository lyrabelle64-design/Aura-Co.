<?php
include "db.php";
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST["name"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $check = mysqli_query($conn, "SELECT * FROM users WHERE email='$email'");
    if (mysqli_num_rows($check) > 0) {
        echo "email_exists";

    }
    else {
        $sql = "INSERT INTO users (name, email, password)
        VALUES ('$name', '$email', '$password')";
        if (mysqli_query($conn, $sql)) {
            echo "success";
        } 
        else {
            echo "error";
        }
    }
}
?>