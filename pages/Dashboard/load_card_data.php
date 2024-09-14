<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['author']) || !isset($data['password'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Author and password are required']);
        exit;
    }

    $cardDataPath = 'C:/xampp/htdocs/Monances-main/pages/Dashboard/card_data.json';
    
    if (!file_exists($cardDataPath)) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Data file not found']);
        exit;
    }

    $existingData = json_decode(file_get_contents($cardDataPath), true);
    
    if (isset($existingData[$data['author']]) && $existingData[$data['author']]['password'] === $data['password']) {
        echo json_encode(['success' => true, 'cardData' => $existingData[$data['author']]['cardData']]);
    } else {
        http_response_code(403);
        echo json_encode(['success' => false, 'message' => 'Invalid author or password']);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
