<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate data
    if (!isset($data['author']) || !isset($data['password']) || !isset($data['cardData'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Invalid input']);
        exit;
    }

    // Define paths
    $cardDataPath = 'C:/xampp/htdocs/Monances-main/pages/Dashboard/card_data.json';
    $loginDataPath = 'C:/xampp/htdocs/Monances-main/LoginRegistration.json';

    // Create or update card data
    $existingData = file_exists($cardDataPath) ? json_decode(file_get_contents($cardDataPath), true) : [];
    $existingData[$data['author']] = [
        'password' => $data['password'],
        'cardData' => $data['cardData']
    ];
    file_put_contents($cardDataPath, json_encode($existingData, JSON_PRETTY_PRINT));

    // Create or update login data
    $loginData = ['username' => $data['author'], 'password' => $data['password']];
    file_put_contents($loginDataPath, json_encode($loginData, JSON_PRETTY_PRINT));

    echo json_encode(['message' => 'Data saved successfully']);
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
}
