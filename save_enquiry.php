<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST')
     {
    header("Location: syed1.html");
    exit();
}

// get and sanitize inputs
$name = $conn->real_escape_string($_POST['name'] ?? '');
$phone = $conn->real_escape_string($_POST['phone'] ?? '');
$email = $conn->real_escape_string($_POST['email'] ?? '');
$product = $conn->real_escape_string($_POST['product'] ?? '');
$message = $conn->real_escape_string($_POST['message'] ?? '');

$stmt = $conn->prepare("INSERT INTO enquiry_db (name, phone, email, product, message) VALUES (?, ?, ?, ?, ?)");
if ($stmt === false) {
    $error_msg = $conn->error;
    $success = false;
} else {
    $stmt->bind_param("sssss", $name, $phone, $email, $product, $message);
    $success = $stmt->execute();
    $error_msg = $stmt->error;
    $stmt->close();
}
$conn->close();

// If the client prefers JSON (AJAX), return JSON. Otherwise render a simple HTML page.
$accept = $_SERVER['HTTP_ACCEPT'] ?? '';

if (stripos($accept, 'application/json') !== false) {
    header('Content-Type: application/json; charset=utf-8');
    if ($success) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $error_msg ?: 'Unknown error']);
    }
    exit();
}


?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Submission Result</title>
<style>
body {
     font-family: Arial;
      background-color: #f7f9fc; 
      text-align:center; padding:50px;
     }
.success {
     background-color: #d4edda; 
     color: #155724;
      padding:20px;
      border-radius:8px; 
      width:400px; 
      margin:auto;
     }
.error {
     background-color: #f8d7da; 
     color: #721c24;
      padding:20px;
       border-radius:8px; 
       width:400px;
        margin:auto;
     }
a { 
    display:inline-block;
     margin-top:15px; 
     text-decoration:none;
      color:#007bff;
       font-weight:bold;
     }
a:hover {
     text-decoration:underline; 
     }
</style>
</head>
<body>

<?php if ($success): ?>
    <div class="success">
        <p>Enquiry submitted successfully!</p>
        <a href="index.html">Go back to form</a>
    </div>
<?php else: ?>
    <div class="error">
        <p>Error: <?= htmlspecialchars($error_msg) ?></p>
        <a href="index.html">Go back to form</a>
    </div>
<?php endif; ?>

</body>
</html>
