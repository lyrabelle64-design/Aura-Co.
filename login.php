<?php
include "db.php";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];
    $sql = "SELECT * FROM users
        WHERE email='$email'
        AND password='$password'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        echo "success";
    } 
    else {
        echo "invalid";
    }
}
?>