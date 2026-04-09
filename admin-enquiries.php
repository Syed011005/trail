<?php
session_start();

// Verify if admin is logged in
if(!isset($_SESSION['admin_logged_in']) || !$_SESSION['admin_logged_in']) {
    header('Location: login.php');
    exit;
}

// Database connection
$servername = "localhost";
$username = "username"; // replace with your database username
$password = "password"; // replace with your database password
$dbname = "database_name"; // replace with your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Pagination
$limit = 10;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$offset = ($page - 1) * $limit;

// Get enquiries
$sql = "SELECT * FROM enquiry_db LIMIT $limit OFFSET $offset";
$result = $conn->query($sql);

// Count total enquiries for pagination
$total_sql = "SELECT COUNT(*) as count FROM enquiry_db";
$total_result = $conn->query($total_sql);
$total_row = $total_result->fetch_assoc();
$total_enquiries = $total_row['count'];
$total_pages = ceil($total_enquiries / $limit);

// Start output
ob_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* Basic styling for responsive table */
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        @media(max-width: 600px) {
            table, thead, tbody, th, td, tr {
                display: block;
            }
        }
    </style>
    <title>Admin Enquiries</title>
</head>
<body>
    <nav>
        <button onclick="window.location.href='logout.php'">Logout</button>
    </nav>
    <h1>Enquiries</h1>
    <input type="text" id="search" placeholder="Search enquiries..." onkeyup="filterEnquiries()">
    <table id="enquiriesTable">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Product</th>
                <th>Message</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        <?php
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td>" . $row['id'] . "</td>";
                    echo "<td>" . $row['name'] . "</td>";
                    echo "<td>" . $row['phone'] . "</td>";
                    echo "<td>" . $row['email'] . "</td>";
                    echo "<td>" . $row['product'] . "</td>";
                    echo "<td>" . $row['message'] . "</td>";
                    echo "<td>" . $row['date'] . "</td>";
                    echo "<td>\n";
                    echo "<button onclick='viewEnquiry({$row['id']})'>View</button> " . 
                         "<button onclick='replyToEnquiry({$row['id']})'>Reply</button> " . 
                         "<button onclick='confirmDelete({$row['id']})'>Delete</button>";
                    echo "</td>";
                    echo "</tr>";
                }
            }
        ?>
        </tbody>
    </table>
    <div class="pagination">
        <?php for ($i = 1; $i <= $total_pages; $i++): ?>
            <a href="?page=<?= $i; ?>"><?= $i; ?></a>
        <?php endfor; ?>
    </div>
    <script>
        function filterEnquiries() {
            var input, filter, table, tr, td, i, j, txtValue;
            input = document.getElementById('search');
            filter = input.value.toUpperCase();
            table = document.getElementById('enquiriesTable');
            tr = table.getElementsByTagName('tr');
            for (i = 1; i < tr.length; i++) {
                tr[i].style.display = 'none';
                td = tr[i].getElementsByTagName('td');
                for (j = 0; j < td.length; j++) {
                    if (td[j]) {
                        txtValue = td[j].textContent || td[j].innerText;
                        if (txtValue.toUpperCase().indexOf(filter) > -1) {
                            tr[i].style.display = '';
                            break;
                        }
                    }
                }
            }
        }
        function confirmDelete(id) {
            if (confirm('Are you sure you want to delete this enquiry?')) {
                window.location.href = 'delete_enquiry.php?id=' + id;
            }
        }
        function viewEnquiry(id) {
            // logic to view enquiry
        }
        function replyToEnquiry(id) {
            // logic to respond to enquiry
        }
    </script>
</body>
</html>
$conn->close();
?>