<?php
// filepath: /c:/Users/moham/OneDrive/Desktop/luminuas project/Luminate-solutions/src/api/login.php

// Enable CORS (Cross-Origin Resource Sharing)
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Include configuration files
require_once 'database.php';
require_once 'cors.php';

// Set the content type to JSON
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get the raw POST data
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Check if username and password are set
if (isset($data['username']) && isset($data['password'])) {
    $username = $data['username'];
    $password = $data['password'];

    // Database connection
    $servername = "localhost";
    $dbusername = "root"; // Replace with your database username
    $dbpassword = ""; // Replace with your database password
    $dbname = "lws2"; // Replace with your database name

    // Create connection
    $conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

    // Check connection
    // if ($conn->connect_error) {
    //     die("Connection failed: " . $conn->connect_error);
    // }
    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
        exit();
    }

    // Prepare and bind
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $username, $password);

    // Execute the statement
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if user exists
    if ($result->num_rows > 0) {
        // Login successful
        echo json_encode(['success' => true]);
    } else {
        // Invalid username or password
        echo json_encode(['success' => false]);
    }

    // Close connection
    $stmt->close();
    $conn->close();
} else {
    // Missing username or password
    echo json_encode(['success' => false, 'message' => 'Missing username or password']);
}
?>