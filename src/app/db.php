<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include configuration files
require_once 'database.php';
require_once 'cors.php';
require 'vendor/autoload.php'; // Include Composer's autoloader

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

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
    // Initialize database and get connection
    $conn = initializeDatabase();
    
    // Get POST data
    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);

    // Validate input data
    if (!$data || !isset($data['name']) || !isset($data['email']) || !isset($data['phone']) || !isset($data['subject']) || !isset($data['message'])) {
        throw new Exception('Invalid input data');
    }

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
    if ($stmt->execute()) {
        // Send email using PHPMailer
        $mail = new PHPMailer(true);
        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host = 'smtp.example.com'; // Set the SMTP server to send through
            $mail->SMTPAuth = true;
            $mail->Username = 'your-email@example.com'; // SMTP username
            $mail->Password = 'your-email-password'; // SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Recipients
            $mail->setFrom($data['email'], $data['name']);
            $mail->addAddress('mohdyousuf9059@gmail.com'); // Add a recipient

            // Content
            $mail->isHTML(true);
            $mail->Subject = 'New Contact Form Submission: ' . $data['subject'];
            $mail->Body    = "
                Name: " . $data['name'] . "<br>
                Email: " . $data['email'] . "<br>
                Phone: " . $data['phone'] . "<br>
                Subject: " . $data['subject'] . "<br>
                Message:<br>" . nl2br($data['message']) . "
            ";

            $mail->send();
            http_response_code(200);
            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'message' => 'Message sent successfully and stored in database'
            ]);
        } catch (Exception $e) {
            throw new Exception('Failed to send email. Mailer Error: ' . $mail->ErrorInfo);
        }
    } else {
        throw new Exception("Execute failed: " . $stmt->error);
    }

} 
catch (Exception $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
} 
finally {
    if (isset($stmt)) {
        $stmt->close();
    }
    if (isset($conn)) {
        $conn->close();
    }
}
?>