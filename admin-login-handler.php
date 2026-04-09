<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get and sanitize username and password from form
    $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
    $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);

    // Validate inputs
    if (empty($username) || empty($password)) {
        die('Username and password are required.');
    }

    // Database connection (assuming $conn is your connection variable)
    $conn = new mysqli('localhost', 'your_db_user', 'your_db_password', 'your_db_name');

    // Check for connection error
    if ($conn->connect_error) {
        die('Connection failed: ' . $conn->connect_error);
    }

    // Query AdminUsers table to find the admin user
    $stmt = $conn->prepare('SELECT admin_id, admin_password FROM AdminUsers WHERE admin_username = ?');
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 1) {
        $stmt->bind_result($admin_id, $admin_password);
        $stmt->fetch();

        // Verify password
        if (password_verify($password, $admin_password)) {
            // Set session variables
            $_SESSION['admin_id'] = $admin_id;
            $_SESSION['admin_username'] = $username;
            $_SESSION['is_admin'] = true;

            // Redirect to admin dashboard
            header('Location: admin-dashboard.php');
            exit;
        } else {
            // Login failed
            die('Invalid username or password.');
        }
    } else {
        // Login failed
        die('Invalid username or password.');
    }

    $stmt->close();
    $conn->close();
} else {
    // Not a POST request
    header('Location: admin-login.html');
    exit;
}
?>