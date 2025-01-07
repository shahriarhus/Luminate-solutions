<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'database.php';

try {
    $conn = initializeDatabase();
    
    $query = "SELECT * FROM quote_form ORDER BY created_at DESC";
    $result = $conn->query($query);
    
    if (!$result) {
        throw new Exception($conn->error);
    }
    
    $quotes = [];
    while ($row = $result->fetch_assoc()) {
        $row['website_focus'] = json_decode($row['website_focus']);
        $row['additional_features'] = json_decode($row['additional_features']);
        $row['website_pages'] = json_decode($row['website_pages']);
        $quotes[] = $row;
    }
    
    echo json_encode(['success' => true, 'data' => $quotes]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
} finally {
    if (isset($result)) $result->close();
    if (isset($conn)) $conn->close();
}
?>
