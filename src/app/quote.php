<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include configuration files
require_once 'database.php';
require_once 'cors.php';

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
    if (!$data || !isset($data['projectName']) || !isset($data['contact']['name']) || !isset($data['contact']['email'])) {
        throw new Exception('Invalid input data');
    }

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO quote_form (project_name, website_details, website_focus, additional_features, website_pages, number_of_pages, reference_websites, email_accounts, objective, website_description, contact_name, contact_phone, contact_email, currency, budget, discount_coupon, reference_person) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }

    $websiteFocus = json_encode($data['websiteFocus']);
    $additionalFeatures = json_encode($data['additionalFeatures']);
    $websitePages = json_encode($data['websitePages']);
    
    $stmt->bind_param("sssssssssssssssss", 
        $data['projectName'],
        $data['websiteDetails'],
        $websiteFocus,
        $additionalFeatures,
        $websitePages,
        $data['numberOfPages'],
        $data['referenceWebsites'],
        $data['emailAccounts'],
        $data['objective'],
        $data['websiteDescription'],
        $data['contact']['name'],
        $data['contact']['phone'],
        $data['contact']['email'],
        $data['currency'],
        $data['budget'],
        $data['discountCoupon'],
        $data['referencePerson']
    );

    // Execute the statement
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Quote submitted successfully'
        ]);
    } else {
        throw new Exception("Execute failed: " . $stmt->error);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
} finally {
    if (isset($stmt)) {
        $stmt->close();
    }
    if (isset($conn)) {
        $conn->close();
    }
}
?>