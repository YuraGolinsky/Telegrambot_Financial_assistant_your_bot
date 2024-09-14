<?php
// Path to the JSON file
$jsonFilePath = 'C:\\xampp\\htdocs\\Monances-main\\pages\\Accumulations\\accumulations.json';

// Read the existing data
$data = file_get_contents($jsonFilePath);
$accumulations = json_decode($data, true);

// Get the input data from the POST request
$input = json_decode(file_get_contents('php://input'), true);

// Extract index and updated data
$index = $input['index'];
$updatedAccumulation = array_slice($input, 1); // Remove 'index' from the data

if (isset($accumulations[$index])) {
    // Update the specific accumulation
    $accumulations[$index] = $updatedAccumulation;

    // Write the updated data back to the JSON file
    file_put_contents($jsonFilePath, json_encode($accumulations, JSON_PRETTY_PRINT));

    // Return success response
    echo json_encode(['status' => 'success']);
} else {
    // Return error response if index is invalid
    echo json_encode(['status' => 'error', 'message' => 'Invalid index']);
}
?>
