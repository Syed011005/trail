<?php
session_start();

// Verify if the user is logged in as admin
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: login.php');
    exit;
}

// Database connection
$mysqli = new mysqli("localhost", "username", "password", "database");

// Check connection
if ($mysqli -> connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
    exit();
}

// Pagination
$limit = 10; // Number of entries to show in a page
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$offset = ($page - 1) * $limit;

$stmt = $mysqli->prepare("SELECT * FROM Products LIMIT ? OFFSET ?");
$stmt->bind_param("ii", $limit, $offset);
$stmt->execute();
$result = $stmt->get_result();

// Display products
echo '<table class="products-table">';
echo '<thead>';
echo '<tr>';
echo '<th>Product ID</th>';
echo '<th>Name</th>';
echo '<th>Category</th>';
echo '<th>Price</th>';
echo '<th>Stock</th>';
echo '<th>Created Date</th>';
echo '<th>Actions</th>';
echo '</tr>';
echo '</thead>';
echo '<tbody>';
while ($row = $result->fetch_assoc()) {
    echo '<tr>';
    echo '<td>' . $row['id'] . '</td>';
    echo '<td>' . $row['name'] . '</td>';
    echo '<td>' . $row['category'] . '</td>';
    echo '<td>' . $row['price'] . '</td>';
    echo '<td>' . $row['stock'] . '</td>';
    echo '<td>' . $row['created_at'] . '</td>';
    echo '<td><button class="edit-btn" data-id="' . $row['id'] . '">Edit</button>';
    echo '<button class="delete-btn" data-id="' . $row['id'] . '">Delete</button></td>';
    echo '</tr>';
}
echo '</tbody>';
echo '</table>';

// Add button to create a new product
echo '<button id="add-product-btn">Add New Product</button>';

// Include modal forms for creating and editing products here

// Include delete confirmation logic

// Display success/error messages

// Search functionality

// Include responsive design styles and navbar
?>