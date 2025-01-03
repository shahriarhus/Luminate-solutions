<?php
// CORS configuration
function setCorsHeaders() {
    header('Access-Control-Allow-Origin: https://luminatewebsol.com/');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
    header('Access-Control-Allow-Credentials: true');
    header('Content-Type: application/json');
}
?>