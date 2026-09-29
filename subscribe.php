<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "aura_co";
$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Database connection failed!");
}
$email = $_POST['email'];
$sql = "INSERT INTO newsletter (email) VALUES ('$email')";
if ($conn->query($sql) === TRUE) {
    echo "Subscribed successfully!";
} else {
    echo "Something went wrong!";
}
$conn->close();
?>