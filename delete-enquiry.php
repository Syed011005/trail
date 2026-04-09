<?php
session_start();

// Verify admin is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php');
    exit;
}

// Check if enquiry ID is provided via GET parameter
if (!isset($_GET['id'])) {
    $_SESSION['flash_message'] = "No enquiry ID provided.";
    header('Location: admin-enquiries.php');
    exit;
}

$enquiry_id = $_GET['id'];

// Connect to database
$host = 'localhost';
$db   = 'your_database';
$user = 'your_username';
$pass = 'your_password';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    $_SESSION['flash_message'] = "Database connection failed: " . $e->getMessage();
    header('Location: admin-enquiries.php');
    exit;
}

// Delete the enquiry from enquiry_db table by ID
$sql = "DELETE FROM enquiry_db WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':id', $enquiry_id, PDO::PARAM_INT);

if ($stmt->execute()) {
    $_SESSION['flash_message'] = "Enquiry deleted successfully.";
} else {
    $_SESSION['flash_message'] = "Error deleting enquiry.";
}

// Redirect back to admin-enquiries.php
header('Location: admin-enquiries.php');
?>