<?php
session_start();

// Verify admin is logged in
if(!isset($_SESSION['admin_logged_in'])) {
    header('Location: login.php');
    exit;
}

// Connect to database
$servername = "localhost";
$username = "your_username"; // replace with your db username
$password = "your_password"; // replace with your db password
$dbname = "your_database"; // replace with your db name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Pagination settings
$limit = 10; // number of users per page
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$offset = ($page - 1) * $limit;

// Get total user count
$result_count = $conn->query("SELECT COUNT(*) as total FROM UserAccounts");
$row_count = $result_count->fetch_assoc();
$total_users = $row_count['total'];

// Get users from UserAccounts table
$sql = "SELECT * FROM UserAccounts LIMIT $limit OFFSET $offset";
$result = $conn->query($sql);

// Search functionality
$search = isset($_GET['search']) ? $_GET['search'] : '';
$search_sql = "SELECT * FROM UserAccounts WHERE username LIKE '%$search%' OR email LIKE '%$search%' LIMIT $limit OFFSET $offset";
$search_result = $conn->query($search_sql);

// Display navbar
echo "<nav><a href='logout.php'>Logout</a></nav>";

// Display user count
echo "<h3>Total Users: $total_users</h3>";

// Display user table
echo "<table><tr><th>User ID</th><th>Username</th><th>Email</th><th>Phone</th><th>Created Date</th><th>Actions</th></tr>";

while ($user = $search_result->fetch_assoc()) {
    echo "<tr><td>" . $user['id'] . "</td><td>" . $user['username'] . "</td><td>" . $user['email'] . "</td><td>" . $user['phone'] . "</td><td>" . $user['created_at'] . "</td><td><a href='view.php?id=" . $user['id'] . "'>View</a> | <a href='delete.php?id=" . $user['id'] . "' onclick='return confirm("Delete this user?")'>Delete</a></td></tr>";
}

echo "</table>";

// Pagination links
$total_pages = ceil($total_users / $limit);
for ($i = 1; $i <= $total_pages; $i++) {
    echo "<a href='admin-users.php?page=$i'>$i</a> ";
}

$conn->close();
?>
