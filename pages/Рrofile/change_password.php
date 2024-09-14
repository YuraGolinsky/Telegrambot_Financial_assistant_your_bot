<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['Username'];
    $currentPassword = $_POST['CurrentPassword'];
    $newPassword = $_POST['NewPassword'];

    $jsonFilePath = 'C:\\xampp\\htdocs\\Monances-main\\LoginRegistration.json';

    if (file_exists($jsonFilePath)) {
        $jsonData = file_get_contents($jsonFilePath);
        $users = json_decode($jsonData, true);

        if (isset($users[$username]) && $users[$username] === $currentPassword) {
            $users[$username] = $newPassword;
            file_put_contents($jsonFilePath, json_encode($users));
            echo 'Password changed successfully';
        } else {
            echo 'Invalid username or current password';
        }
    } else {
        echo 'User database not found';
    }
} else {
    echo 'Invalid request method';
}
?>
