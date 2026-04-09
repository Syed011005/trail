<?php
session_start();

// Verify admin is logged in
if (!isset($_SESSION['admin_logged_in']) || !$_SESSION['admin_logged_in']) {
    header('Location: login.php');
    exit();
}

// Check if product ID is provided via GET parameter
if (!isset($_GET['id'])) {
    $_SESSION['error_message'] = 'Product ID is not provided.';
    header('Location: admin-products.php');
    exit();
}
$product_id = intval($_GET['id']);

// Connect to database
$mysqli = new mysqli('localhost', 'username', 'password', 'database');

// Check connection
if ($mysqli->connect_error) {
    $_SESSION['error_message'] = 'Database connection failed: ' . $mysqli->connect_error;
    header('Location: admin-products.php');
    exit();
}

// Prepare statement to delete product
$stmt = $mysqli->prepare('DELETE FROM Products WHERE id = ?');
$stmt->bind_param('i', $product_id);
$stmt->execute();

// Check if deletion was successful
if ($stmt->affected_rows > 0) {
    $_SESSION['success_message'] = 'Product deleted successfully.';
} else {
    $_SESSION['error_message'] = 'Product deletion failed or product does not exist.';
}

$stmt->close();
$mysqli->close();

// Redirect back to admin-products.php
header('Location: admin-products.php');
exit();
?>