<?php
header('Content-Type: application/json');

// Configuration settings
$db_host = 'localhost';
$db_username = 'root';
$db_password = '';
$db_name = 'lwsd';

// Create a connection to the MySQL database
$conn = new mysqli($db_host, $db_username, $db_password, $db_name);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Check if the contact_form table exists
$table_name = "contact_form";
$query = "SHOW TABLES LIKE '$table_name'";
$result = $conn->query($query);

if ($result->num_rows == 0) {
    // Create the contact_form table if it doesn't exist
    $create_table_query = "CREATE TABLE $table_name (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50),
        phone VARCHAR(10),
        email VARCHAR(50),
        subject VARCHAR(50),
        message VARCHAR(100)
    )";
    if ($conn->query($create_table_query) === TRUE) {
        echo json_encode(["success" => true, "message" => "Table $table_name created successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error creating table $table_name: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => true, "message" => "Table $table_name already exists"]);
}

// Get form data from Angular application
$name = isset($_POST['name']) ? $conn->real_escape_string($_POST['name']) : '';
$email = isset($_POST['email']) ? $conn->real_escape_string($_POST['email']) : '';
$phone = isset($_POST['phone']) ? $conn->real_escape_string($_POST['phone']) : '';
$subject = isset($_POST['subject']) ? $conn->real_escape_string($_POST['subject']) : '';
$message = isset($_POST['message']) ? $conn->real_escape_string($_POST['message']) : '';

// Log received data
error_log("Received data: name=$name, email=$email, phone=$phone, subject=$subject, message=$message");

// Insert form data into MySQL database
$sql = "INSERT INTO $table_name (name, phone, email, subject, message) VALUES ('$name', '$phone', '$email', '$subject', '$message')";

// Execute SQL query
if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Form data submitted successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error submitting form data: " . $conn->error]);
}

$conn->close();
?>