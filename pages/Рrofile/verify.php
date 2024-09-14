<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['lUsername'];
    $password = $data['Password'];

    $loginData = json_decode(file_get_contents('C:/xampp/htdocs/Monances-main/LoginRegistration.json'), true);

    if (isset($loginData[$username]) && $loginData[$username] == $password) {
        $profileData = json_decode(file_get_contents('C:/xampp/htdocs/Monances-main/pages/Рrofile/profile.json'), true);
        foreach ($profileData as $profile) {
            if ($profile['name'] == $username) {
                echo json_encode(['success' => true, 'profile' => $profile]);
                exit;
            }
        }
    }
    echo json_encode(['success' => false]);
}
?>
