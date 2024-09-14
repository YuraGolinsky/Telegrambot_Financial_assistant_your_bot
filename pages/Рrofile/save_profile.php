<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем данные из POST-запроса
    $name = $_POST['name'];
    $bio = $_POST['bio'];
    $age = $_POST['age'];

    // Обрабатываем загруженное изображение
    if (isset($_FILES['profileImage']) && $_FILES['profileImage']['error'] === UPLOAD_ERR_OK) {
        $uploadedImage = $_FILES['profileImage'];
        $targetDir = 'C:\xampp\htdocs\Monances-main\pages\Рrofile\img\\';
        $targetFile = $targetDir . basename($uploadedImage['name']);
        
        // Проверяем и сохраняем изображение
        if (move_uploaded_file($uploadedImage['tmp_name'], $targetFile)) {
            $profileImagePath = 'img/' . basename($uploadedImage['name']); 
        } else {
            $profileImagePath = 'img/profile.png'; 
        }
    } else {
        $profileImagePath = 'img/profile.png'; 
    }

    $jsonFile = 'C:\xampp\htdocs\Monances-main\pages\Рrofile\profile.json';
    $profiles = json_decode(file_get_contents($jsonFile), true);
    
    if (!$profiles) {
        $profiles = [];
    }

    $newId = count($profiles) + 1;

    $profileData = [
        'id' => strval($newId), 
        'name' => $name,
        'bio' => $bio,
        'age' => $age,
        'image' => $profileImagePath
    ];

    $profiles[] = $profileData;

    file_put_contents($jsonFile, json_encode($profiles, JSON_PRETTY_PRINT));

    echo json_encode(['success' => true]);
}
?>
