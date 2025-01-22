<?php
// Disable error reporting for production
error_reporting(0);
ini_set('display_errors', 0);

// Include configuration files
require_once 'database.php';
require_once 'cors.php';
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require './phpmailer/phpmailer/src/Exception.php';
require './vendor/phpmailer/phpmailer/src/PHPMailer.php';
require './vendor/phpmailer/phpmailer/src/SMTP.php';

// Set CORS headers
setCorsHeaders();

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

try {
    // Get POST data
    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);

    // Validate input data
    if (!$data || !isset($data['name']) || !isset($data['email']) || !isset($data['phone']) || !isset($data['subject']) || !isset($data['message'])) {
        throw new Exception('Invalid input data');
    }

    // Initialize database and get connection
    $conn = initializeDatabase();
    
    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO contact_form (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)");
    
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("sssss", 
        $data['name'],
        $data['email'],
        $data['phone'],
        $data['subject'],
        $data['message']
    );

    // Execute the statement
    if (!$stmt->execute()) {
        throw new Exception("Database error: " . $stmt->error);
    }

    // Send email using PHPMailer
    $mail = new PHPMailer(true);
    
    // Server settings
    $mail->isSMTP();
    $mail->Host = 'hostname.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'user@domain.com';
    $mail->Password = 'Password';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;
    
    // Recipients
    $mail->setFrom('user@domain.com', 'String');
    $mail->addAddress('user@domain.com', 'String');
    $mail->addReplyTo($data['email'], $data['name']);
    
    // Content
    $mail->isHTML(true);
    $mail->Subject = 'New Contact Form Submission: ' . htmlspecialchars($data['subject']);
    $mail->Body = "
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> " . htmlspecialchars($data['name']) . "</p>
        <p><strong>Email:</strong> " . htmlspecialchars($data['email']) . "</p>
        <p><strong>Phone:</strong> " . htmlspecialchars($data['phone']) . "</p>
        <p><strong>Subject:</strong> " . htmlspecialchars($data['subject']) . "</p>
        <p><strong>Message:</strong><br>" . nl2br(htmlspecialchars($data['message'])) . "</p>
    ";
    $mail->send();

    header('Content-Type: application/json');
    echo json_encode([
        'success' => true,
        'message' => 'Message sent successfully and stored in database'
    ]);
} catch (Exception $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>