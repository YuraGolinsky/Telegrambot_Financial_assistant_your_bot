<?php
// Устанавливаем заголовки для ответа
header('Content-Type: application/json');

// Получаем данные из POST-запроса
$data = json_decode(file_get_contents('php://input'), true);

// Проверяем, что данные пришли и валидны
if (!isset($data['photo'], $data['title'], $data['goal'], $data['currency'], $data['saved'], $data['creator'])) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
    exit;
}

// Путь к файлу JSON
$filePath = 'C:/xampp/htdocs/Monances-main/pages/Accumulations/accumulations.json';

// Читаем существующие данные из файла
if (file_exists($filePath)) {
    $jsonData = file_get_contents($filePath);
    $accumulations = json_decode($jsonData, true);
} else {
    $accumulations = [];
}

// Добавляем новые данные
$accumulation = [
    'photo' => $data['photo'],
    'title' => $data['title'],
    'goal' => $data['goal'],
    'currency' => $data['currency'],
    'saved' => $data['saved'],
    'date' => $data['date'] ?? null,
    'creator' => $data['creator']
];

$accumulations[] = $accumulation;

// Сохраняем обновленные данные обратно в файл
if (file_put_contents($filePath, json_encode($accumulations, JSON_PRETTY_PRINT))) {
    echo json_encode(['status' => 'success', 'message' => 'Accumulation saved successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to save accumulation']);
}
?>
