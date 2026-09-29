<?php
include "db.php";
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $email = $_POST["email"];
    $address = $_POST["address"];
    $city = $_POST["city"];
    $payment = $_POST["payment"];
    $subtotal = $_POST["subtotal"];
    $delivery = $_POST["delivery"];
    $total = $_POST["total"];
    $cart = json_decode($_POST["cart"], true);
    // SAVE ORDER
    $sql = "INSERT INTO orders
        (customer_name, phone, email, address, city, payment_method, subtotal, delivery_charges, total_bill)
        VALUES
        ('$name', '$phone', '$email', '$address', '$city', '$payment', '$subtotal', '$delivery', '$total')";
    if (mysqli_query($conn, $sql)) {
        $order_id = mysqli_insert_id($conn);
        // SAVE ORDER PRODUCTS
        foreach ($cart as $product) {
            $product_name = $product["name"];
            $price = (float) preg_replace('/[^0-9.]/', '', $product["price"]);
            $quantity = $product["quantity"] ?? 1;
            $product_total = $price * $quantity;
            $product_sql = "INSERT INTO order_products
                (order_id, product_name, price, quantity, total)
                VALUES
                ('$order_id', '$product_name', '$price', '$quantity', '$product_total')";

            mysqli_query($conn, $product_sql);
        }
        echo "success";
    } 
    else {
        echo "error";
    }
}
?>